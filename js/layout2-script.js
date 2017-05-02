

function newElement($element, $attribute) {
	var element = document.createElement($element);
	for (var attr in $attribute){
		element.setAttribute(attr, $attribute[attr]);
	}
	return element;
}

function dropdownToggle(elt) {
	var dropdownContent = elt.nextElementSibling;
	dropdownContent.classList.toggle("show");
}

window.onclick = function(event) {
  if (!event.target.matches('.dropdown-btn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    for (var i = 0; i < dropdowns.length; i++) {
      if (dropdowns[i].classList.contains('show')) {
        dropdowns[i].classList.remove('show');
      }
    }
  }
}

function arrowOn(elt) {
	elt.children[0].classList.add("arrow-show");
}

function arrowOff(elt) {
	elt.children[0].classList.remove("arrow-show");
}



function updateCartDropdownBtn() {
	var cartDropdownBtn = document.getElementsByClassName('cart-dropdown-btn');
	
	var totalPrice = 0;
	var quantity = 0;
		for (var i = 0, len = localStorage.length; i < len; ++i) {
			var product = JSON.parse(localStorage.getItem(localStorage.key(i)));

			totalPrice += (product.quantity * Number(product.price.replace(/[^0-9\.]+/g,"")));
			quantity += 1;
			
		}
		cartDropdownBtn[0].innerHTML = '<i class="fa fa-shopping-cart"></i>' + quantity + ' item(s) - $' + totalPrice + ' <i class="fa fa-caret-down"></i>';
		console.log('update cart status successfull');
}

function updateCartDropdownContent() {

	// get cart Element
	var cartElement = document.getElementsByClassName('cart');

	var CartDropdownContentString = '';
	if(localStorage.length == 0) {

		// if cart is EMPTY update cart status
		updateCartDropdownBtn();
		CartDropdownContentString = '<p class="cart-view">Your cart is empty</p>';
	} else {

			// if cart is NOT empty, loop through all the product in local storage
			var totalPrice = 0;
			for (var i = 0, len = localStorage.length; i < len; ++i) {
				totalPrice = 0;
				CartDropdownContentString += '<div class="row">'
				var product = JSON.parse(localStorage.getItem(localStorage.key(i)));

				totalPrice += (product.quantity * Number(product.price.replace(/[^0-9\.]+/g,"")));
				
				CartDropdownContentString += '<div class="col-3"><img src="images/' + product.value + '.jpg" alt="" class="product-square-img"></div><div class="col-9 cart-detail">' + product.name + '<br>x ' + product.quantity + '<br>$' + Number(product.price.replace(/[^0-9\.]+/g,"")) + '</div>';
				CartDropdownContentString += '</div>'
			}
			CartDropdownContentString += '<button class="green-btn" onclick="viewCart()">VIEW CART</button><button class="green-btn" onclick="clearCart()">EMPTY CART</button>';
	}
	cartElement[0].innerHTML = CartDropdownContentString;
}


// get selected product and add it into cart (localstorage)
function addToCart(elt) {
	var productElement = elt.parentNode;
	var productName = productElement.children[1].innerHTML;
	var productPrice = productElement.children[2].innerHTML;
	var productQuantity = 1;
	var productValue = productElement.getAttribute('value');
	console.log('\nRECEIVED PRODUCT: \n' + productValue + '\n' + productName + '\n' + productPrice + '\n');

	// Loop through products in local Storage
	for (var i = 0, len = localStorage.length; i < len; ++i) {
		var cartProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));

		// If selected product exist in cart (local storage) then increase quantity
		if(cartProduct.name == productName) {
			productQuantity = cartProduct.quantity;
			console.log("Product already exist increase quantity");
			productQuantity += 1;
		}
	}
	
	// add product to cart (local storage) and update cart status
	var product = {'value': productValue, 'name': productName, 'price': productPrice, 'quantity': productQuantity };
	localStorage.setItem(product.name, JSON.stringify(product));
  updateCartDropdownContent();
  updateCartDropdownBtn();
	window.scrollTo(0,0);

	
}

// update cart status every time page is loaded
updateCartDropdownContent();
updateCartDropdownBtn();

function viewCart(elt) {
	window.location.href = 'file:///home/cuong/site/mysite/cart.html';
}

	
function clearCart(elt) {
	localStorage.clear();		
	updateCartDropdownBtn();
	updateCartDropdownContent();
}