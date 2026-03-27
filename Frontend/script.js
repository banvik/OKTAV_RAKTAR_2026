import { items } from "./items.js";
const addBtn = document.getElementById("new-item-btn");
const cancelBtn = document.getElementById("cancel-btn");
const closeCardBtn = document.getElementById("card-close");
const inventoryTable = document.getElementById("inventory-tbody");
const itemForm = document.getElementById("item-form");
const nameInput = document.getElementById("item-name");
const categoryInput = document.getElementById("item-category");
const sizeInput = document.getElementById("item-size");
const nameTableHead = document.getElementById("th-name");
const categortyTableHead = document.getElementById("th-category");
const lengthTableHead = document.getElementById("th-length");
const itemCard = document.getElementById("item-card");

let currentSortField = null;
let currentSortDirection = "asc";

function addRow(name, category, size) {
	const newRow = document.createElement("tr");

	newRow.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>${Number(size)}</td>
    `;
	newRow.addEventListener("click", () =>
		showItemDetails(name, category, size),
	);
	inventoryTable.appendChild(newRow);
}
function renderTable() {
	inventoryTable.innerHTML = "";
	items.forEach((item) => addRow(item.name, item.category, item.length));
}

function showItemForm() {
	document.getElementById("form-container").classList.remove("hidden");
}
function hideItemForm() {
	itemForm.reset();
	document.getElementById("form-container").classList.add("hidden");
}

function showItemDetails(name, category, length) {
	document.getElementById("card-name").textContent = `megnevezés: ${name}`;
	document.getElementById("card-category").textContent =
		`kategória: ${category}`;
	document.getElementById("card-length").textContent =
		`hossz (mm): ${length}`;

	itemCard.classList.remove("hidden");
}
function closeItemDetails() {
	itemCard.classList.add("hidden");
}

function sortBy(field) {
	if (currentSortField === field) {
		currentSortDirection = currentSortDirection === "asc" ? "desc" : "asc";
	} else {
		currentSortField = field;
		currentSortDirection = "asc";
	}
	items.sort((a, b) => {
		const itemA = a[field];
		const itemB = b[field];

		let result;

		if (typeof itemA === "string") {
			result = itemA.localeCompare(itemB);
		} else {
			result = itemA - itemB;
		}

		return currentSortDirection === "asc" ? result : -result;
	});
	renderTable();
}

addBtn.addEventListener("click", showItemForm);
cancelBtn.addEventListener("click", hideItemForm);
closeCardBtn.addEventListener("click", closeItemDetails);
nameTableHead.addEventListener("click", () => sortBy("name"));
categortyTableHead.addEventListener("click", () => sortBy("category"));
lengthTableHead.addEventListener("click", () => sortBy("length"));
itemForm.addEventListener("submit", (e) => {
	e.preventDefault();
	items.push({
		name: nameInput.value,
		category: categoryInput.value,
		length: sizeInput.value,
	});
	renderTable();
	hideItemForm();
});

renderTable();
