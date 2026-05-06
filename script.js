const items = [
{name:"Espresso", price:100},
{name:"Latte", price:150},
{name:"Cappuccino", price:180},
{name:"Americano", price:120},
{name:"Mocha", price:200},
{name:"Cold Coffee", price:160},
{name:"Iced Latte", price:170},
{name:"Burger", price:150},
{name:"Pizza", price:200},
{name:"Sandwich", price:120},
{name:"Fries", price:90},
{name:"Brownie", price:110},
{name:"Cheesecake", price:200},
{name:"Donut", price:80},
{name:"Croissant", price:140}
];

let cart = {};
let total = 0;

function loadMenu(filtered = items) {
let html = "";

filtered.forEach((item, index) => {
html += `
<div class="col-md-4 mb-3">
<div class="card p-3">
<h5>${item.name}</h5>
<p>₹${item.price}</p>
<button class="btn btn-dark" onclick="addToCart(${index})">Add</button>
<button class="btn btn-danger mt-2" onclick="removeFromCart(${index})">Remove</button>
</div>
</div>`;
});

document.getElementById("menu").innerHTML = html;
}

window.onload = () => loadMenu();

function searchItems() {
let q = document.getElementById("search").value.toLowerCase();
let filtered = items.filter(i => i.name.toLowerCase().includes(q));
loadMenu(filtered);
}

function addToCart(index) {
let item = items[index];

if (!cart[item.name]) cart[item.name] = {qty:0, price:item.price};
cart[item.name].qty++;

updateCart();
}

function removeFromCart(index) {
let item = items[index];

if (cart[item.name]) {
cart[item.name].qty--;
if (cart[item.name].qty <= 0) delete cart[item.name];
}
updateCart();
}

function updateCart() {

let html = "";
total = 0;

for (let item in cart) {
let cost = cart[item].qty * cart[item].price;
total += cost;
html += `${item} x ${cart[item].qty} = ₹${cost}<br>`;
}

let addons = document.getElementsByClassName("addon");
let addonCost = 0;

for (let i = 0; i < addons.length; i++) {
if (addons[i].checked) {
addonCost += parseInt(addons[i].value);
}
}

if (addonCost > 0) {
total += addonCost;
html += `Add-ons = ₹${addonCost}<br>`;
}

if (!html) html = "Cart is empty";

document.getElementById("cart").innerHTML = html;
document.getElementById("total").innerHTML = "Total: ₹" + total;
}

function payNow() {

let method = document.getElementById("payment").value;

if (total === 0) {
alert("Cart is empty!");
return;
}

if (!method) {
alert("Select payment method!");
return;
}

if (method === "UPI" || method === "PhonePe") {
document.getElementById("qrPopup").style.display = "flex";
} else {
document.getElementById("status").innerHTML =
"<b>Payment Successful via " + method + " ✅</b>";
}
}

function closeQR() {
document.getElementById("qrPopup").style.display = "none";
document.getElementById("status").innerHTML =
"<b>Payment Successful ✅</b>";
}