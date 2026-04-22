import { useState, useEffect } from "react";

export default function WarehousePage() {
	const [stocks, setStocks] = useState([])
	const [isOpen, setIsOpen] = useState(true);
	const [quantity, setQuantity] = useState(0);
	const [productId, setProductId] = useState(0);
	const [warehouseId, setWarehouseID] = useState(0);

	useEffect(() => {
		fetch("http://localhost:8080/api/stock")
			.then((res) => res.json())
			.then((data) => setStocks(data));
	}, []);

	function handleClose(){
		setIsOpen(false)
	}
	function handleSubmit(e) {
		e.preventDefault();

		const productData = {
			product: { productId: productId },
			warehouseId: warehouseId,
			productQuantity: quantity,
		};

		// const url = editingId
		// 	? `http://localhost:8080/api/products/${editingId}`
		// 	: "http://localhost:8080/api/products";

		// const method = editingId ? "PUT" : "POST";

		fetch("http://localhost:8080/api/stock", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productData),
		});
		// .then((res) => res.json())
		// .then((data) => {
		// 	if (editingId) {
		// 		setProducts((prev) =>
		// 			prev.map((p) => (p.productId === editingId ? data : p)),
		// 		);
		// 	} else {
		// 		setProducts((prev) => [...prev, data]);
		// 	}

		// 	handleClose();
		// });
	}
	return (
		<div>
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
								<input
									type="number"
									value={productId}
									onChange={(e) =>
										setProductId(e.target.value)
									}
									required
								/>
							</label>
							<label>
								Raktár:
								<input
									type="number"
									value={warehouseId}
									onChange={(e) =>
										setWarehouseID(e.target.value)
									}
									required
								/>
							</label>

							<label>
								Mennyiség:
								<input
									type="number"
									value={quantity}
									onChange={(e) =>
										setQuantity(e.target.value)
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
