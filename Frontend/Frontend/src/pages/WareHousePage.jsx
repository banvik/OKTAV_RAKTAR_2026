import { useState, useEffect } from "react";

export default function WarehousePage() {
	const [stocks, setStocks] = useState([])
	const [isOpen, setIsOpen] = useState(false);
	const [products, setProducts] = useState([])
	const [quantity, setQuantity] = useState(0);
	const [productId, setProductId] = useState(0);
	const [warehouseId, setWarehouseID] = useState(0);

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

		// const url = editingId
		// 	? `http://localhost:8080/api/products/${editingId}`
		// 	: "http://localhost:8080/api/products";

		// const method = editingId ? "PUT" : "POST";

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
	return (
		<div>
			<button onClick={() => setIsOpen(true)}>Bevételezés</button>
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
						{stocks.map((stock, i) => {
							return (
								<tr key={i}>
									<td>{stock.product.productName}</td>
									<td>{stock.productQuantity}</td>
									<td>{stock.warehouseId}</td>
									<td>
										<button
											onClick={() => console.log("Edit")}
										>
											Módosítás
										</button>
										<button
											onClick={() =>
												console.log("törlés")
											}
										>
											Törlés
										</button>
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
		</div>
	);
}
