import { warehouses } from "./warehouses.js";
import { whInventory } from "./whinventory.js"; 

const wareHouseSelect = document.getElementById("warehouse-select");
const stockTable = document.getElementById("stock-table")

function loadWareHouses() {
	warehouses.map((warehouse) => {
		const option = document.createElement("option");
		option.value = warehouse.id;
		option.textContent = warehouse.name;
		wareHouseSelect.appendChild(option);
	});
}

function addRow(name, category, quantity) {
	const newRow = document.createElement("tr");

	newRow.innerHTML = `
        <td>${name}</td>
        <td>${category}</td>
        <td>${Number(quantity)}</td>
    `;
	newRow.addEventListener("click", () =>
        console.log("clicked")
		// showItemDetails(name, category, size),
	);
	stockTable.appendChild(newRow);
}

// function renderInventory() {
//     stockTable.innerHTML = ""
//     whInventory.filter(item => item.warehouse === wareHouseSelect.value)
// }
function handleWareHouseChange() {
    stockTable.innerHTML=""
		whInventory.filter((item) => item.warehouseId === wareHouseSelect.value)
        .map(item => addRow(item.itemName, item.type, item.quantity))
}
wareHouseSelect.addEventListener("change", handleWareHouseChange)

loadWareHouses()
