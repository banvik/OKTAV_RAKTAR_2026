import { useState, useEffect } from "react";

export default function WarehousePage() {
	const [stocks, setStocks] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [isTransferOpen, setIsTransferOpen] = useState(false);
	const [products, setProducts] = useState([])
	const [quantity, setQuantity] = useState(0);
	const [productId, setProductId] = useState(0);
	const [warehouseId, setWarehouseID] = useState(0);
	const [activeWarehouseId, setActiveWarehouseId] = useState(1)
	const [activeWarehouseStock, setActiveWarehouseStock] = useState([])
	const [fromWarehouseId, setFromWarehouseId] = useState(0)
	const [toWarehouseId, setToWarehouseId] = useState(0)

	const warehouses = [1,2,3,4]

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
	function handleMove(e) {
		e.preventDefault()
		const transferInfo = {
			productId: productId,
			fromWarehouseId: fromWarehouseId,
			toWarehouseId: toWarehouseId,
			quantity: quantity

		}
		fetch("http://localhost:8080/api/stock/transfer", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(transferInfo),
		})
		.then(()=> fetch("http://localhost:8080/api/stock"))
		.then((res) => res.json())
		.then((data) => setStocks(data))
		setQuantity(0)
		setIsTransferOpen(false)
	}
	return (
		<div className="flex flex-col items-center gap-2">
			<div className="flex">
				{warehouses.map(warehouse => <button key={warehouse} onClick={() => setActiveWarehouseId(warehouse)}>{warehouse}</button>)}
			</div>
			<button onClick={() => setIsOpen(true)}>Bevételezés</button>
			<button onClick={() => handleMove()}>Mozgatás</button>
			
			<div className="table-wrapper max-h-96 overflow-y-auto ">
				<table>
					<thead className="sticky top-0 bg-[#EEEBAB]">
						<tr>
							<th>Terméknév</th>
							<th>Mennyiség</th>
							<th>Raktár</th>
						</tr>
					</thead>
					<tbody>
						{activeWarehouseStock.map((stock, i) => {
							return (
								<tr key={i}>
									<td>{stock.product.productName}</td>
									<td>{stock.productQuantity}</td>
									<td>{stock.warehouseId}</td>
									<td>
										{(activeWarehouseId === 1 )&& (<>
										<button
											onClick={() => {setIsTransferOpen(true);setProductId(stock.product.productId);setFromWarehouseId(1),setToWarehouseId(2)}}
										>
											Zárolás
										</button>
										<button
											onClick={() => {setIsTransferOpen(true);setProductId(stock.product.productId);setFromWarehouseId(1),setToWarehouseId(3)}}
										>
											Foglalás
										</button>
										<button
											onClick={() => {setIsTransferOpen(true);setProductId(stock.product.productId);setFromWarehouseId(1),setToWarehouseId(4)}}
										>
											Selejtezés
										</button>
										</>)}
									</td>
								</tr>
							
							);
						})}
					</tbody>
				</table>
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
									size={2}
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
					onClick={()=> setIsTransferOpen(false)}
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
								<button type="submit">Áthelyezés</button>
								<button type="button" onClick={()=> setIsTransferOpen(false)}>
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
