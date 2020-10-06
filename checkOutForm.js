
var items = [];
items.push(["Cheese Pizza",50]);
items.push(["BBQ Chicken Pizza",90]);
items.push(["Hawaiian Pizza",80]);

var cart =[];
var total = 0;


function addToCart(){

	var itms = document.getElementById("items");
	cart.push(items[itms.selectedIndex]);

	total += items[itms.selectedIndex][1];
	var totalBox = document.getElementById("totalBox").innerHTML = "Total = " + total ;
}

function checkout(){
	alert("your cart total = " + total)
}