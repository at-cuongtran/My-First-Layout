var Product = function ($name, $price, $quantity) {
	this.name = $name;
	this.price = $price;
	this.quantity = $quantity;
};

Product.prototype.total = function() {
	return this.price * this.quantity;
};

var products = [];
var pen = new Product('Pen', 5, 4);
products.push(pen);
var pencil = new Product('Pencil', 10, 8);
products.push(pencil);

function newElement($element, $attribute) {
	var element = document.createElement($element);
	for (var attr in $attribute){
		element.setAttribute(attr, $attribute[attr]);
	}
	return element;
}

function updateTotal() {
	var sum = 0;
	for (var id in products) {
		var selectedValue = parseInt(selectElement[id].value);
		products[id].quantity = selectedValue;
		var total = products[id].total();
		table.tBodies[0].rows[id].cells[4].innerHTML = total;
		sum += total;
	}
	table.tFoot.rows[0].cells[1].innerHTML = sum;
}

var container = document.getElementsByClassName('container');
var selectElement = document.getElementsByClassName('select-list');
var table = newElement('table', {'class':'table'});

// delete curtain product in products
function deleteProduct(elt) {
	var parentElement = elt.parentNode.parentNode;
	products.splice(parentElement.cells[0].innerHTML, 1);
	parentElement.remove();
	console.log(parentElement);
	updateTotal();
}

// CREATE SELECT LIST STRING
var selectString = '<select class="select-list" onChange="updateTotal()">';
for (var i = 0; i <= 10; i++) {
	selectString += '<option value="' + i + '">' + i + '</option>';
}
selectString += '</select>';

// Create Table String
var sum = 0;
var contentString = '';
var headString = '<thead><th>Index</th><th>Name</th><th>Price</th><th>Quantity</th><th>total</th></thead>';
var bodyString = '<tbody>';
for (var id in products) {
	var total = products[id].total();
	sum += total;
	bodyString += '<tr>';
	bodyString += '<td>' + id + '</td>';
	bodyString += '<td>' + products[id].name + '</td>';
	bodyString += '<td>' + products[id].price + '</td>';
	bodyString += '<td>' + selectString + '</td>';
	bodyString += '<td>' + total + '</td>';
	bodyString += '<td><input type="button" value="Delete" onClick="deleteProduct(this)"></td>';
	bodyString += '</tr>';
}
bodyString += '</tbody>';

var footString = '<tfoot>';
footString += '<tr>';
footString += '<td colspan="4">sum</td><td>' + sum + '</td>';
footString += '</tr>';
footString += '</tfoot>';

contentString += headString + bodyString + footString;
table.innerHTML = contentString;
container[0].appendChild(table);

// CHANGE QUANTITY VALUE MATCH PRODUCT.QUANTITY
for (var id in products){
	for (var nodeId = 0; nodeId <= 10; nodeId++){
		var optionElement = selectElement[id].getElementsByTagName('option')[nodeId];
		if (optionElement.value == products[id].quantity){
			optionElement.setAttribute('selected', 'selected');
			break;
		}
	}
}
