$(document).ready( () => {
  updateCartStatus();
  
  $('.cart-table').append(tableString());

  $('.dropdown-btn').click( (event) => {
    $(event.target).next().toggleClass('show');
  });

  $('.add-to-cart').click( (event) => {
    var productElement:any = $(event.target).parent();
    var productName:string = productElement.children()[1].innerHTML;
    var productPrice:number = currencyToNumber(productElement.children()[2].innerHTML); 
    var productQuantity:number = 1;
    var productValue:string = productElement.attr('value');
    // Loop through products in local Storage
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      var cartProduct = getStorageItem(i);
      // If selected product exist in cart (local storage) then increase quantity
      if(cartProduct.name === productName) {
        productQuantity = cartProduct.quantity;
        productQuantity++;
      }
    }
    // add product to cart (local storage) and update cart status
    var product:any = {'value': productValue, 'name': productName, 'price': productPrice, 'quantity': productQuantity };
    setStorageItem(product.name, product);
    console.log(`update local storage successfull`);
    updateCartStatus();
    window.scrollTo(0,0);
  });

  $('.view-cart').click( () => {
    window.location.href = 'file:///home/cuong/site/mysite/cart.html';
  });

  $('.clear-cart').click( () => {
    localStorage.clear();
    updateCartStatus();
  });  
});

$(document).click( (event) => {
  if (!$(event.target).closest('.dropdown-content').length && !$(event.target).closest('.dropdown-btn').length) {
    var dropdowns = $('.dropdown-content');
    if(dropdowns.hasClass('show')) {
      dropdowns.removeClass('show');
    }
  }
});

var updateCartStatus = () => {
  var cartDropdownBtn:any = $(".cart-dropdown-btn");
  var cartElement:any = $(".cart");
  var CartDropdownContentString:string = '';
  var quantity:number = 0;
  var totalPrice:number = 0;

  if(localStorage.length === 0) {
    CartDropdownContentString = '<p class="cart-view">Your cart is empty</p>';
  } else {
      // if cart is NOT empty, loop through all products in local storage and assign them to string
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        var product = getStorageItem(i);
        totalPrice += (product.quantity * product.price);
        quantity++;

        CartDropdownContentString += `
        <div class="row">
          <div class="col-3">
            <img src="images/${product.value}.jpg" alt="" class="product-square-img">
          </div>
          <div class="col-9 cart-detail">
            ${product.name}<br>x ${product.quantity}<br>$${product.price}
          </div>
        </div>`;
      }
      CartDropdownContentString += `
      <button class="green-btn view-cart">
        VIEW CART
      </button>
      <button class="green-btn clear-cart">
        EMPTY CART
      </button>`;
  }
  // render to cart status
  cartDropdownBtn.html(`
    <i class="fa fa-shopping-cart dropdown-btn"></i>
      ${quantity} item(s) - $${totalPrice} 
    <i class="fa fa-caret-down dropdown-btn"></i>`);
  cartElement.html(CartDropdownContentString);
  console.log('update cart status successfull\n');
}


var createSelectListString = (productQuantity) => {
  var selectListString = '<select class="select-list" onChange="updateQuantity()">';
  for (var i = 0; i <= 10; i++) {
    if (productQuantity === i) {
      selectListString += `<option value="${i}" selected="selected">${i}</option>`;
    } else {
      selectListString += `<option value="${i}">${i}</option>`;
    }
  }
  selectListString += '</select>';
  return selectListString;
}

function tableString() {
  var sum = 0;
  var tableString:string = `
  <table class="table">'
    <thead><th>Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>total</th>
  </thead>
  <tbody>`;
  for (var i = 0, len = localStorage.length; i < len; ++i){
    var product = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var total = product.quantity * product.price;
    sum += total;
    tableString += `
    <tr>
      <td>${product.value}</td>
      <td>${product.name}</td>
      <td>${product.price}</td>
      <td>${createSelectListString(product.quantity)}</td>
      <td>$${total}</td>
    </tr>`;
  }
  tableString += `</tbody>
  <tfoot>
    <tr>
      <td colspan="4"><strong>sum</strong></td>
      <td><strong>$${sum}</strong></td>
    </tr>
  </tfoot>`;

  tableString += '</table>';
  return(tableString);
}

function updateQuantity() {
  var selectElements = $('.select-list');
  var tableElements = $('.table');
  var sum = 0;
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    var product = getStorageItem(i);
    var selectedValue = parseInt(selectElements[i].value);

    product.quantity = selectedValue;
    var totalPrice = product.quantity * product.price;
    tableElements.find('tbody').find('tr')[i].cells[4].innerHTML = `$${totalPrice}`;
    sum += totalPrice;
    setStorageItem(product.name, product);
  }
  tableElements.find('tfoot').find('strong')[1].innerHTML = `$${sum}`;
  updateCartStatus();
}

var currencyToNumber = (argument) => {
  return Number(argument.replace(/[^0-9\.]+/g,""));
}

var getStorageItem = (key: number) => {
  return JSON.parse(localStorage.getItem(localStorage.key(key)));
}

var setStorageItem = (name: string, item: string) => {
  return localStorage.setItem(name, JSON.stringify(item));
}

