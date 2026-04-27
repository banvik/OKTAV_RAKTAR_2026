import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import {
	FaTrash,
	FaInbox,
	FaTruck,
	FaLock,
	FaHandPaper,
} from "react-icons/fa";
import Button from "../components/Button";
import { FaArrowTurnUp } from "react-icons/fa6";

export default function WarehousePage() {
	const [stocks, setStocks] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [isTransferOpen, setIsTransferOpen] = useState(false);
	const [isDispatch, setIsDispatch] = useState(false)
	const [products, setProducts] = useState([])
	const [quantity, setQuantity] = useState(0);
	const [productId, setProductId] = useState(0);
	const [warehouses, setWarehouses] = useState([])
	const [warehouseId, setWarehouseID] = useState(0);
	const [activeWarehouseId, setActiveWarehouseId] = useState(1)
	const [activeWarehouseStock, setActiveWarehouseStock] = useState([])
	const [toWarehouseId, setToWarehouseId] = useState(0)


	useEffect(() => {
		fetch("http://localhost:8080/api/stock")
			.then((res) => res.json())
			.then((data) => setStocks(data));
	}, []);

	useEffect(() => {
		fetch("http://localhost:8080/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);

	useEffect(() => {
		fetch("http://localhost:8080/api/warehouses")
			.then((res) => res.json())
			.then((data) => setWarehouses(data));
	}, []);

	useEffect(()=> {
		if(stocks.length > 0){
			setActiveWarehouseStock(stocks.filter(stock => stock.warehouseId === activeWarehouseId && stock.productQuantity > 0))
		}
		
	},[stocks, activeWarehouseId])

	function handleClose(){
		setProductId(0)
		setQuantity(0)
		setIsOpen(false)
	}
	function handleSubmit(e) {
		e.preventDefault();

		const productData = {
			productId: productId,
			quantity: quantity,
		};

		fetch("http://localhost:8080/api/stock/incoming", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productData),
		})
			.then((res) => res.json())
			.then((data) => {
				setStocks((prev) => {
					const exists = prev.find(
						(stock) =>
							stock.product.productId === data.product.productId &&
							stock.warehouseId === data.warehouseId,
					);

					if (exists) {
						return prev.map((stock) =>
							stock.product.productId === data.product.productId &&
							stock.warehouseId === data.warehouseId
								? data
								: stock,
						);
					}

					return [...prev, data];
				});

				handleClose();
			});
	}
async function handleMove(e) {
	e.preventDefault();

	const transferInfo = {
		productId: productId,
		fromWarehouseId: activeWarehouseId,
		toWarehouseId: toWarehouseId,
		quantity: quantity,
	};
	if(isDispatch){
		const outGoing = {
			productId: productId,
			warehouseId: activeWarehouseId,
			quantity: quantity,
		}
		try {
		const response = await fetch("http://localhost:8080/api/stock/outgoing", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(outGoing),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			const message = errorData?.message || "Sikertelen Művelet!";
			throw new Error(message);
		}

		const stockRes = await fetch("http://localhost:8080/api/stock");

		if (!stockRes.ok) {
			throw new Error("Raktárkészlet betöltése sikertelen!");
		}

		const data = await stockRes.json();
		setStocks(data);

		toast.success("Sikeres készletmozgatás!");

		setQuantity(0);
		setIsTransferOpen(false);
		setIsDispatch(false);

	} catch (error) {
		console.error(error);

		toast.error("Készletmozgatás sikertelen!");
	}
	}
	else {try {
		const response = await fetch("http://localhost:8080/api/stock/transfer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transferInfo),
		});

		if (!response.ok) {
			const errorData = await response.json().catch(() => null);
			const message = errorData?.message || "Sikertelen Művelet!";
			throw new Error(message);
		}

		const stockRes = await fetch("http://localhost:8080/api/stock");

		if (!stockRes.ok) {
			throw new Error("Raktárkészlet betöltése sikertelen!");
		}

		const data = await stockRes.json();
		setStocks(data);

		toast.success("Sikeres készletmozgatás!");

		setQuantity(0);
		setIsTransferOpen(false);

	} catch (error) {
		console.error(error);

		toast.error(error.message || "Készletmozgatás sikertelen!");
	}}
}
	return (
		<div className="flex items-start gap-2">
			<div className="flex flex-col gap-2">
				{warehouses.map((warehouse) => (
					<button
						key={warehouse.warehouseId}
						onClick={() =>
							setActiveWarehouseId(warehouse.warehouseId)
						}
					>
						{warehouse.warehouseName}
					</button>
				))}
			</div>
			<div className="flex flex-1 justify-center">
				<div className="table-wrapper max-h-96 overflow-y-auto ">
					<div className="flex justify-between mb-2">
					<h1 className="text-2xl">
						{
							warehouses.find(
								(warehouse) =>
									warehouse.warehouseId === activeWarehouseId,
							)?.warehouseName
						}{" "}
						Raktár
					</h1>
					{activeWarehouseId === 1 && (
						<button handleClick={() => setIsOpen(true)}>Bevételezés</button>
					)}
					</div>
					<table>
						<thead className="sticky top-0 bg-[#EEEBAB]">
							<tr>
								<th>Terméknév</th>
								<th>Mennyiség</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							{activeWarehouseStock.length === 0 ? (
								<tr>
									<td
										colSpan={3}
										className="text-center py-4"
									>
										A raktár üres
									</td>
								</tr>
							) : (
								activeWarehouseStock.map((stock, i) => {
									return (
										<tr key={i}>
											<td>{stock.product.productName}</td>
											<td>{stock.productQuantity}</td>
											<td className="flex gap-1 mx-3">
												{(activeWarehouseId === 1 ||
													activeWarehouseId ===
														3) && (
													<Button
														handleClick={() => {
															setIsTransferOpen(
																true,
															);
															setIsDispatch(true);
															setProductId(
																stock.product
																	.productId,
															);
														}}
														buttonIcon={<FaTruck />}
														buttonText={"Kiadás"}
													/>
												)}
												{activeWarehouseId === 1 && (
													<>
														<Button
															handleClick={() => {
																setIsTransferOpen(
																	true,
																);
																setProductId(
																	stock
																		.product
																		.productId,
																);
																setToWarehouseId(
																	2,
																);
															}}
															buttonIcon={
																<FaLock />
															}
															buttonText={
																"Zárolás"
															}
														/>
														<Button
															handleClick={() => {
																setIsTransferOpen(
																	true,
																);
																setProductId(
																	stock
																		.product
																		.productId,
																);
																setToWarehouseId(
																	3,
																);
															}}
															buttonIcon={
																<FaHandPaper />
															}
															buttonText={
																"Foglalás"
															}
														/>
														<Button
															handleClick={() => {
																setIsTransferOpen(
																	true,
																);
																setProductId(
																	stock
																		.product
																		.productId,
																);
																setToWarehouseId(
																	4,
																);
															}}
															buttonIcon={
																<FaTrash />
															}
															buttonText={
																"Selejtezés"
															}
														/>
													</>
												)}
												{activeWarehouseId !== 1 && (
													<Button
														handleClick={() => {
															setIsTransferOpen(
																true,
															);
															setProductId(
																stock.product
																	.productId,
															);
															setToWarehouseId(1);
														}}
														buttonIcon={
															<FaArrowTurnUp />
														}
														buttonText={
															"Állapot Feloldása"
														}
													/>
												)}
											</td>
										</tr>
									);
								})
							)}
						</tbody>
					</table>
				</div>
			</div>
			{isOpen && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={handleClose}
				>
					<div
						className="bg-[#EEEBAB] p-6 rounded-xl min-w-[300px] max-w-[500px] shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<form id="item-form" onSubmit={handleSubmit}>
							<label>
								Termék:
								<select
									value={productId}
									onChange={(e) =>
										setProductId(Number(e.target.value))
									}
									required
								>
									<option value="">Válassz terméket</option>
									{products.map((p) => (
										<option
											key={p.productId}
											value={p.productId}
										>
											{p.productName}
										</option>
									))}
								</select>
							</label>
							<label>
								Mennyiség:
								<input
									type="number"
									value={quantity}
									onChange={(e) =>
										setQuantity(Number(e.target.value))
									}
									required
								/>
							</label>

							<div className="form-btn-cont">
								<button type="submit">Hozzáad</button>
								<button type="button" onClick={handleClose}>
									Mégse
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
			{isTransferOpen && (
				<div
					className="fixed inset-0 bg-black/50 flex items-center justify-center z-50"
					onClick={() => setIsTransferOpen(false)}
				>
					<div
						className="bg-[#EEEBAB] p-6 rounded-xl min-w-[300px] max-w-[500px] shadow-xl"
						onClick={(e) => e.stopPropagation()}
					>
						<form id="item-form" onSubmit={(e) => handleMove(e)}>
							<label>
								Mennyiség:
								<input
									type="number"
									value={quantity}
									onChange={(e) =>
										setQuantity(Number(e.target.value))
									}
									required
								/>
							</label>
							<div className="form-btn-cont">
								<button type="submit">
									{isDispatch ? "Kiadás" : "Áthelyezés"}
								</button>
								<button
									type="button"
									onClick={() => setIsTransferOpen(false)}
								>
									Mégse
								</button>
							</div>
						</form>
					</div>
				</div>
			)}
		</div>
	);
}
