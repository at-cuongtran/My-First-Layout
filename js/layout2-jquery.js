$(document).ready(function() {
  updateCartDropdownBtn();
  updateCartDropdownContent();

  $('.dropdown-btn').click(function () {
    $(this).next().toggleClass('show');
  });

  $('.add-to-cart').click(function () {
    var $productElement = $(this).parent();
    var $productName = $productElement.children()[1].text;

    // cannot get text of span tag (or this span tag only) so use innerHTML instead
    var $productPrice = $productElement.children()[2].innerHTML; 
    var $productQuantity = 1;
    var $productValue = $productElement.attr('value');
    console.log('\nRECEIVED PRODUCT: \n' + $productValue + '\n' + $productName + '\n' + $productPrice + '\n');

    // Loop through products in local Storage
    for (var i = 0, len = localStorage.length; i < len; ++i) {
      var $cartProduct = JSON.parse(localStorage.getItem(localStorage.key(i)));

      // If selected product exist in cart (local storage) then increase quantity
      if($cartProduct.name == $productName) {
        $productQuantity = $cartProduct.quantity;
        console.log("Product already exist increase quantity");
        $productQuantity += 1;
      }
    }

    // add product to cart (local storage) and update cart status
    var $product = {'value': $productValue, 'name': $productName, 'price': $productPrice, 'quantity': $productQuantity };
    localStorage.setItem($product.name, JSON.stringify($product));
    console.log('update local storage successfull');
    updateCartDropdownBtn();
    updateCartDropdownContent();
    window.scrollTo(0,0);
  });

  $('.view-cart').click(function () {
    window.location.href = 'file:///home/cuong/site/mysite/cart.html';
  });

  $('.clear-cart').click(function () {
    localStorage.clear();
    updateCartDropdownBtn();
    updateCartDropdownContent();
  });

  $('.cart-table').append(tableString());
});

$(document).click(function (event) {
  if (!$(event.target).closest('.dropdown-content').length && !$(event.target).closest('.dropdown-btn').length) {
    var $dropdowns = $('.dropdown-content');
    if($dropdowns.hasClass('show')) {
      $dropdowns.removeClass('show');
    }
  }
});

function updateCartDropdownBtn () {
  var $cartDropdownBtn = $(".cart-dropdown-btn");
  var $quantity = 0;
  var $totalPrice = 0;
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    var $product = JSON.parse(localStorage.getItem(localStorage.key(i)));
    console.log($product);
    $totalPrice += ($product.quantity * currencyToNumber($product.price));
    $quantity += 1;
    
  }
  $cartDropdownBtn.html('<i class="fa fa-shopping-cart dropdown-btn"></i>' + $quantity + ' item(s) - $' + $totalPrice + ' <i class="fa fa-caret-down dropdown-btn"></i>');
  console.log('update cart status successfull');
}

function updateCartDropdownContent () {
  var $cartElement = $(".cart");
  var $CartDropdownContentString = '';

  if(localStorage.length == 0) {

    // if cart is EMPTY assign "your cart is emtpy"
    $CartDropdownContentString = '<p class="cart-view">Your cart is empty</p>';
  } else {

      // if cart is NOT empty, loop through all products in local storage and assign them to string
      for (var i = 0, len = localStorage.length; i < len; ++i) {
        $CartDropdownContentString += '<div class="row">'
        var $product = JSON.parse(localStorage.getItem(localStorage.key(i)));
        
        $CartDropdownContentString += '<div class="col-3"><img src="images/' + $product.value + '.jpg" alt="" class="product-square-img"></div><div class="col-9 cart-detail">' + $product.name + '<br>x ' + $product.quantity + '<br>' + $product.price + '</div>';
        $CartDropdownContentString += '</div>'
      }
      $CartDropdownContentString += '<button class="green-btn view-cart">VIEW CART</button><button class="green-btn clear-cart">EMPTY CART</button>';
  }
  // render the html string to cart element
  $cartElement.html($CartDropdownContentString);
}

function tableString() {
  var $sum = 0;

  var $tableString = '<table class="table">'
  var $headString = '<thead><th>Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>total</th></thead>';
  
  var $bodyString = '<tbody>';
  for (var i = 0, len = localStorage.length; i < len; ++i){
    var $product = JSON.parse(localStorage.getItem(localStorage.key(i)));

    var $total = $product.quantity * currencyToNumber($product.price);
    $sum += $total;
    $bodyString += '<tr>';
    $bodyString += '<td>' + $product.value + '</td>';
    $bodyString += '<td>' + $product.name + '</td>';
    $bodyString += '<td>' + $product.price + '</td>';
    $bodyString += '<td>' + createSelectListString($product.quantity) + '</td>';
    $bodyString += '<td>$' + $total + '</td>';
    $bodyString += '</tr>';
  }
  $bodyString += '</tbody>';

  var footString = '<tfoot>';
  footString += '<tr>';
  footString += '<td colspan="4"><strong>sum</strong></td><td><strong>$' + $sum + '</strong></td>';
  footString += '</tr>';
  footString += '</tfoot>';

  $tableString += $headString + $bodyString + footString + '</table>';

  return($tableString);
}

function updateQuantity() {
  var $selectElements = $('.select-list');
  var $tableElements = $('.table');
  var $sum = 0;
  for (var i = 0, len = localStorage.length; i < len; ++i) {
    var $product = JSON.parse(localStorage.getItem(localStorage.key(i)));
    var $selectedValue = parseInt($selectElements[i].value);

    $product.quantity = $selectedValue;
    var $totalPrice = $product.quantity * currencyToNumber($product.price);
    $tableElements.find('tbody').find('tr')[i].cells[4].innerHTML = '$' + $totalPrice;
    $sum += $totalPrice;
    localStorage.setItem($product.name, JSON.stringify($product));
  }
  $tableElements.find('tfoot').find('strong')[1].innerHTML = '$' + $sum;
  updateCartDropdownBtn();
}

function createSelectListString($productQuantity) {
  var $selectListString = '<select class="select-list" onChange="updateQuantity()">';
  for (var i = 0; i <= 10; i++) {
    if ($productQuantity == i) {
      $selectListString += '<option value="' + i + '" selected="selected">' + i + '</option>'
    } else {
      $selectListString += '<option value="' + i + '">' + i + '</option>';
    }
  }
  $selectListString += '</select>';
  return $selectListString;
}

function currencyToNumber($argument) {
  return Number($argument.replace(/[^0-9\.]+/g,""));
}