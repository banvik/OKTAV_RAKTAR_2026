import { useState, useEffect } from "react";

export default function ProductsPage() {
    const [products, setProducts] = useState([])
    const [categories, setCategories] = useState([]);
    const [name, setName] = useState()
    const [category, setCategory] = useState()
    const [size, setSize] = useState()
    const [isOpen, setIsOpen] = useState(false)

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
		const cat = categories.find((c) => c.category_id === id);
		return cat ? cat.category_name : "Unknown";
	};

    function handleSubmit() {
        e.preventDefault();

		const newProduct = {
			product_name: name,
			category_id: category,
			product_size: size,
		};

		fetch("http://localhost:8080/api/products", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(newProduct),
		})
			.then((res) => res.json())
			.then((data) => {
				setProducts((prev) => [...prev, data]);
				setIsOpen(false);
				setName("");
				setCategory("");
				setSize("");
			})
			.catch((err) => console.error(err));
	}
    return (
		<div>
			<div className="inventory-container">
				<h1>Termékek</h1>
				<button
					onClick={() => setIsOpen(true)}
					className="btn btn-primary"
				>
					új tárgy felvétele
				</button>
				<table>
					<thead>
						<tr>
							<th>Terméknév</th>
							<th>Kategória</th>
							<th>Méret</th>
						</tr>
					</thead>
					<tbody>
						{products.map((product, i) => {
							return (
								<tr key={i}>
									<td>{product.product_name}</td>
									<td>
										{getCategoryName(product.category_id)}
									</td>
									<td>{product.product_size}</td>
								</tr>
							);
						})}
					</tbody>
				</table>
				{isOpen && (
					<div className="">
						<form id="item-form" onSubmit={handleSubmit}>
							<label>
								Név:
								<input
									type="text"
									value={name}
									onChange={(e) => setName(e.target.value)}
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
									<option value="">Válassz kategóriát</option>

									{categories.map((cat) => (
										<option
											key={cat.category_id}
											value={cat.category_id}
										>
											{cat.category_name}
										</option>
									))}
								</select>
							</label>
							<label>
								Hossz (mm):
								<input
									type="number"
									value={size}
									onChange={(e) => setSize(e.target.value)}
									required
								/>
							</label>
							<div className="form-btn-cont">
								<button type="submit">
									tárgy hozzáadása
								</button>
								<button
									type="button"
									onClick={() => setIsOpen(false)}
								>
									mégse
								</button>
							</div>
						</form>
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