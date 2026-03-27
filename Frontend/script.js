import { items } from "./items.js";
const addBtn = document.getElementById("new-item-btn")
const cancelBtn = document.getElementById("cancel-btn")
const inventoryTable = document.getElementById("inventory-tbody")
const itemForm = document.getElementById("item-form")
const nameInput = document.getElementById("item-name")
const categoryInput = document.getElementById("item-category")
const sizeInput = document.getElementById("item-size")
const nameTableHead = document.getElementById("th-name")


function addRow(name, category, size) {
    const newRow = document.createElement("tr");

    const nameCell = document.createElement("td");
    nameCell.textContent = name;

    const categoryCell = document.createElement("td");
    categoryCell.textContent = category;

    const sizeCell = document.createElement("td");
    sizeCell.textContent = size;

    newRow.appendChild(nameCell);
    newRow.appendChild(categoryCell);
    newRow.appendChild(sizeCell);

    inventoryTable.appendChild(newRow);
}
function renderTable() {
    inventoryTable.innerHTML = ""
    items.forEach(item => addRow(item.name, item.category, item.length))
}

function showItemForm() {
    document.getElementById("form-container").classList.remove("hidden");
}
function hideItemForm() {
    itemForm.reset()
    document.getElementById("form-container").classList.add("hidden")
}

function sortByName() {
    items.sort((a,b) => a.name.localeCompare(b.name))
    renderTable()
}

addBtn.addEventListener("click", showItemForm)
cancelBtn.addEventListener("click", hideItemForm)
nameTableHead.addEventListener("click", sortByName)
itemForm.addEventListener("submit", (e)=> {
    e.preventDefault()
    items.push({name: nameInput.value, category: categoryInput.value, length: sizeInput.value })
    renderTable()
    hideItemForm()
})

renderTable()



