var Product = function ($name, $price, $quantity) {
	this.name = $name;
	this.price = $price;
	this.quantity = $quantity;	
}
Product.prototype.sum = function() {
	return this.price * this.quantity;
};

var pen = new Product("Pen", 5, 100);
var pencil = new Product("Pencil", 10, 150);


function createRow($className, $table) {
	var tr = document.createElement('tr');
	tr.setAttribute("class", $className);

	$table.appendChild(tr);
}

function createHead($content, $row) {
	var th = document.createElement('th');
	var content = document.createTextNode($content);
	th.appendChild(content);

	$row.appendChild(th);
}

function createCell($content, $row) {
	var td = document.createElement('td');
	var content = document.createTextNode($content);
	td.appendChild(content);

	$row.appendChild(td);
}

// Create table element with class
var table = document.createElement("table");
table.setAttribute("class", "table");

// Insert table into demo div
var outerElement = document.getElementsByClassName("demo");
outerElement[0].appendChild(table);

// Insert a row into table
var tableElement = document.getElementsByClassName("table");
createRow("row",tableElement[0]);

// Insert table head
var rowElement = document.getElementsByClassName("row");
createHead("name", rowElement[0]);
createHead("price", rowElement[0]);
createHead("quantity", rowElement[0]);
createHead("sum", rowElement[0]);

// Insert data 
createRow("row",tableElement[0]);
createCell(pen.name, rowElement[1]);
createCell(pen.price, rowElement[1]);
createCell(pen.quantity, rowElement[1]);
createCell(pen.sum(), rowElement[1]);

// Insert data 
createRow("row",tableElement[0]);
createCell(pencil.name, rowElement[2]);
createCell(pencil.price, rowElement[2]);
createCell(pencil.quantity, rowElement[2]);
createCell(pencil.sum(), rowElement[2]);




console.log("hello!");