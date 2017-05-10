

function newElement($element, $attribute) {
  var element = document.createElement($element);
  for (var attr in $attribute){
    element.setAttribute(attr, $attribute[attr]);
  }
  return element;
}

function updateQuantity() {
  var selectElement = document.getElementsByClassName('select-list');
  var table = document.getElementsByTagName('table');
  var sum = 0;
  for (var i = 0, len = localStorage.length; i < len; ++i) {

    var product = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var selectedValue = parseInt(selectElement[i].value);
    product.quantity = selectedValue;

    var total = product.quantity * Number(product.price.replace(/[^0-9\.]+/g,""));
    table[0].tBodies[0].rows[i].cells[4].innerHTML = '$' + total;
    console.log('\ni: ' + i + '\nproduct: \n' + product + '\n');
    sum += total;

    localStorage.setItem(product.name, JSON.stringify(product));

  }
  table[0].tFoot.rows[0].cells[1].innerHTML = '$' + sum;
  updateCartDropdownBtn();
}

function updateCartPage() {
  var cartTableContainer = document.getElementsByClassName('cart-table');
  console.log('cartTableContainer: ' + cartTableContainer[0]);
  var table = newElement('table', {'class':'table'});


  // CREATE QUANTITY SELECT LIST STRING
  var quantitySelectString = '<select class="select-list" onChange="updateQuantity()">';
  for (var i = 0; i <= 10; i++) {
    quantitySelectString += '<option value="' + i + '">' + i + '</option>';
  }
  quantitySelectString += '</select>';

  // Create Table String
  var sum = 0;
  var contentString = '';
  var headString = '<thead><th>Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>total</th></thead>';
  var bodyString = '<tbody>';


  for (var i = 0, len = localStorage.length; i < len; ++i){
    var product = JSON.parse(localStorage.getItem(localStorage.key(i)));

    var total = product.quantity * Number(product.price.replace(/[^0-9\.]+/g,""));
    sum += total;
    bodyString += '<tr>';
    bodyString += '<td>' + product.value + '</td>';
    bodyString += '<td>' + product.name + '</td>';
    bodyString += '<td>$' + Number(product.price.replace(/[^0-9\.]+/g,"")) + '</td>';
    bodyString += '<td>' + quantitySelectString + '</td>';
    bodyString += '<td>$' + total + '</td>';
    bodyString += '</tr>';
  }
  bodyString += '</tbody>';

  var footString = '<tfoot>';
  footString += '<tr>';
  footString += '<td colspan="4"><strong>sum</strong></td><td><strong>$' + sum + '</strong></td>';
  footString += '</tr>';
  footString += '</tfoot>';

  contentString += headString + bodyString + footString;
  table.innerHTML = contentString;
  cartTableContainer[0].appendChild(table);

}

updateCartPage();

// CHANGE QUANTITY VALUE IN THE TABLE MATCH PRODUCT.QUANTITY
var selectElement = document.getElementsByClassName('select-list');
for (var i = 0, len = localStorage.length; i < len; ++i){
  var product = JSON.parse(localStorage.getItem(localStorage.key(i)));
  for (var nodeId = 0; nodeId <= 10; nodeId++){
    var optionElement = selectElement[i].getElementsByTagName('option')[nodeId];
    if (optionElement.value == product.quantity){
      optionElement.setAttribute('selected', 'selected');
      break;
    }
  }
}