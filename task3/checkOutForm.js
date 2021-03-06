
var resturants = 
	[
		{"name":"PizzaHut", "menu":[
			{"itemName":"pepperoni pizza","price":80,"description":"pepperoni and cheese","imgLink":"file:./images/Pizza-Pepperoni.png"},
			{"itemName":"Cheese Pizza","price":70,"description":"cheese cheese cheese","imgLink":"file:./images/ThreeCheese-Pizza.png"},
			{"itemName":"Smokey Pizza","price":110,"description":"Smoked meat with BBQ sause","imgLink":"file:./images/Smokey-BBQ.png"},
			{"itemName":"chicken supreme","price":100,"description":"chicken ","imgLink":"file:./images/Chicken-Supreme.png"},
			{"itemName":"Chili chicken","price":80,"description":"spicy chicken","imgLink":"file:./images/Chili-Chicken.png"},
			{"itemName":"Chicken BBQ","price":70,"description":"Chicken with BBQ ","imgLink":"file:./images/Chicken-BBQ.png"}
		]}
		,
		{"name":"Hardees", "menu":[
			{"itemName":"mushrom angus combo ","price":120,"description":" Snadwitch pepsi and fries", "imgLink":"file:./images/mushrom-angus-combo.webp"},
			{"itemName":"mushroom nswiss combo","price":100, "description":" Snadwitch pepsi and fries","imgLink":"file:./images/mushroom-nswiss-combo.webp"},
			{"itemName":"steak loader combo","price":115,"description":" Snadwitch pepsi and fries","imgLink":"file:./images/steak-loader-combo.webp"}
		]}

	]


var cart =[];
var total = 0;
var currentResturant;
const MENU_ROW_LEN =3;

function loadResturants(){
resturants.forEach((element,index) => {
	document.getElementById("resturants-list").innerHTML += `<a class="dropdown-item" index="${index}"  onclick="displayResturantsMenu(this)">${element.name}</a>`		
	});

}

function displayResturantsMenu(src){
	document.getElementById("menu-items").innerHTML = '';
	var resturant = resturants[src.getAttribute('index')];
	currentResturant = resturant;
	document.getElementById("dropdownMenuButton").innerHTML = resturant.name;
	resturant.menu.forEach((item,index) =>{
appendHTMLItem(item,index);
	})
}

function addToCart(src){
	
	var item = extractItem(src);
	
	var searchCartItem = cart.find(i=>i.item.itemName==item.itemName)
	console.log(searchCartItem);
	if(!searchCartItem ){
		updateTotal(item.price);
	cart.push({"item":item, "quantity":1});
	appendHtmlCartItem(item);
}else{
		console.log(searchCartItem.item.price)
		updateTotal(searchCartItem.item.price);
		searchCartItem.quantity +=1; 
		document.getElementById(item.itemName).innerHTML = searchCartItem.quantity; 

	}

}

function appendHtmlCartItem(item){
	document.getElementById("cart-items").innerHTML += `
	<div id="div-${item.itemName}" class = "col-12">
	<li  class="list-group-item  d-flex justify-content-between  align-items-center">${item.itemName}
	<button class="btn btn-danger" value="${item.itemName}" onclick="removeItemFromCart(this.value)"> - </button> 
	<span id="${item.itemName}" class="badge badge-primary badge-pill">1</span>
	</li>
	</div>
	`
}
function removeItemFromCart(itemName){
	
	var cartItem = cart.find(i => i.item.itemName == itemName);
	if(cartItem){
		updateTotal(-cartItem.item.price);
		if(cartItem.quantity == 1){
			var id = "div-"+cartItem.item.itemName;
			 document.getElementById(id).remove()
	
			 var index = cart.indexOf(cartItem);
			 cart.splice(index,1);
			 

		}else{
			cartItem.quantity -=1;
			document.getElementById(cartItem.item.itemName).innerHTML = cartItem.quantity; 
		}
	}else{
		console.error("cant find item to remove ");
	}
}
function updateTotal(price){
	total += price;
	document.getElementById("total-text").innerHTML = "Total = "+ total;
}

function checkout(){
	alert("your cart total = " + total)
}

function extractItem(src){
	var itemIndex = src.getAttribute("index");
	var item = currentResturant.menu[itemIndex];

	return item;
}

function appendHTMLItem(item,index){
	document.getElementById("menu-items").innerHTML+= 
	`
	<div class="col-xs-12 col-sm-6 col-lg-4 mt-3 ">
		<div class="card text-right text-dark bg-warning" >

			<img class="card-img-top rounded"  src="${item.imgLink}" alt="Card image cap">
		 	<div class="card-body ">
				<h5 class="card-title text-center ">${item.itemName}</h5>
				<p class="card-text text-left" style="font-size: 0.75rem; ">${item.description} </p>
			</div>

			<div class=" row card-footer justify-content-between rounded bg-light">
				<div class="col-4 text-left">
					<span>Price: ${item.price} </span>
				</div>
				<div calss=col-4 align-self-end">
				<button  index="${index}" onclick="addToCart(this)" class="btn btn-success"><i class="fas fa-cart-plus"></i></button>
				</div>
			
			</div>
		</div>
	</div>
	`
}