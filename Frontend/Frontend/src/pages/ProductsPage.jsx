import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
	const [editingId, setEditingId] = useState(null);
    const [name, setName] = useState("")
    const [category, setCategory] = useState("")
    const [size, setSize] = useState(0)
	const [color, setColor] = useState("")
	const [colorCode, setColorCode] = useState("")
	const [info, setInfo] = useState("")
    const [isOpen, setIsOpen] = useState(false)
	const [search, setSearch] = useState("");

    useEffect(() => {
		fetch("http://localhost:8080/api/products")
			.then((res) => res.json())
			.then((data) => setProducts(data));
	}, []);
    useEffect(() => {
		fetch("http://localhost:8080/api/categories")
			.then((res) => res.json())
			.then((data) => setCategories(data))
			.catch((err) => console.error(err));
	}, []);

    const getCategoryName = (id) => {
		const cat = categories.find((c) => c.categoryId === id);
		return cat ? cat.categoryName : "Unknown";
	};

	const filteredProducts = products.filter(
		(product) =>
			product.productName.toLowerCase().includes(search.toLowerCase()) ||
			getCategoryName(product.categoryId)
				.toLowerCase()
				.includes(search.toLowerCase()),
	);

    function handleSubmit(e) {
		e.preventDefault();

		const productData = {
			productName: name,
			categoryId: category,
			productSize: size,
			productColor: color,
			productColorCode: colorCode,
			productInfo: info,
		};

		const url = editingId
			? `http://localhost:8080/api/products/${editingId}`
			: "http://localhost:8080/api/products";

		const method = editingId ? "PUT" : "POST";

		fetch(url, {
			method,
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(productData),
		})
			.then((res) => res.json())
			.then((data) => {
				if (editingId) {
					setProducts((prev) =>
						prev.map((p) => (p.productId === editingId ? data : p)),
					);
				} else {
					setProducts((prev) => [...prev, data]);
				}

				handleClose()
			});
	}

	function handleDelete(id) {
		fetch(`http://localhost:8080/api/products/${id}`, {
			method: "DELETE",
			headers: {
				"Content-Type": "application/json",
			},
		})
		.then(() => {
			setProducts((prev) => prev.filter((p) => p.productId !== id));
		});
	}
	function handleEdit(id) {
		fetch(`http://localhost:8080/api/products/${id}`)
			.then((res) => res.json())
			.then((data) => {
				setName(data.productName?? "");
				setCategory(data.categoryId?? "");
				setSize(data.productSize?? "");
				setColor(data.productColor?? "");
				setColorCode(data.productColorCode?? "");
				setInfo(data.productInfo?? "");
				setEditingId(id);
				setIsOpen(true);
			});
	}
	function handleClose() {
		setName("");
		setCategory("");
		setSize(0);
		setColor("");
		setColorCode("");
		setInfo("");
		setEditingId(null);
		setIsOpen(false);
	}
    return (
		<div>
			<div className="inventory-container">
				<h1 className="text-2xl">Termékek</h1>
				<div className="flex gap-4">
					<input
						type="text"
						placeholder="Keresés..."
						value={search}
						onChange={(e) => setSearch(e.target.value)}
					/>
					<button
						onClick={() => setIsOpen(true)}
						className="btn btn-primary"
					>
						Új tárgy felvétele
					</button>
				</div>
				<div className="table-wrapper max-h-96 overflow-y-auto ">
					<table>
						<thead className="sticky top-0 bg-[#EEEBAB]">
							<tr>
								<th>Terméknév</th>
								<th>Azonosító kód</th>
								<th>Kategória</th>
								<th>Méret</th>
								<th>Szín</th>
								<th>Műveletek</th>
							</tr>
						</thead>
						<tbody>
							{filteredProducts.map((product, i) => {
								return (
									<tr key={i}>
										<td>{product.productName}</td>
										<td>{product.productId}</td>
										<td>
											{getCategoryName(
												product.categoryId,
											)}
										</td>
										<td>{product.productSize}</td>
										<td>{product.productColor}</td>
										<td>
											<button
												onClick={() =>
													handleEdit(
														product.productId,
													)
												}
											>
												Módosítás
											</button>
											<button
												onClick={() =>
													handleDelete(
														product.productId,
													)
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
				{!filteredProducts.length && <span>Nincs találat</span>}
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
									Név:
									<input
										type="text"
										value={name}
										onChange={(e) =>
											setName(e.target.value)
										}
										required
									/>
								</label>

								<label>
									Kategória:
									<select
										value={category}
										onChange={(e) =>
											setCategory(e.target.value)
										}
										required
									>
										<option value="">
											Válassz kategóriát
										</option>
										{categories.map((cat) => (
											<option
												key={cat.categoryId}
												value={cat.categoryId}
											>
												{cat.categoryName}
											</option>
										))}
									</select>
								</label>

								<label>
									Méret:
									<input
										type="number"
										value={size}
										onChange={(e) =>
											setSize(e.target.value)
										}
										required
									/>
								</label>
								<label>
									Szín:
									<input
										type="text"
										value={color}
										onChange={(e) =>
											setColor(e.target.value)
										}
										required
									/>
								</label>
								<label>
									Színkód:
									<input
										type="text"
										value={colorCode}
										onChange={(e) =>
											setColorCode(e.target.value)
										}
										required
									/>
								</label>
								<label>
									Leírás:
									<input
										type="text"
										value={info}
										onChange={(e) =>
											setInfo(e.target.value)
										}
										required
									/>
								</label>

								<div className="form-btn-cont">
									<button type="submit">
										{editingId ? "Módosít" : "Hozzáad"}
									</button>
									<button type="button" onClick={handleClose}>
										Mégse
									</button>
								</div>
							</form>
						</div>
					</div>
				)}
				{/* <div className="hidden">
					<button >X</button>
					<p >megnevezés:</p>
					<p >kategória:</p>
					<p >hossz:</p>
				</div> */}
			</div>
		</div>
	);
}