$(document).ready(function () {
    updateCartStatus();
    $('.cart-table').append(tableString());
    $('.dropdown-btn').click(function (event) {
        $(event.target).next().toggleClass('show');
    });
    $('.add-to-cart').click(function (event) {
        var productElement = $(event.target).parent();
        var productName = productElement.children()[1].innerHTML;
        var productPrice = currencyToNumber(productElement.children()[2].innerHTML);
        var productQuantity = 1;
        var productValue = productElement.attr('value');
        // Loop through products in local Storage
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var cartProduct = getStorageItem(i);
            // If selected product exist in cart (local storage) then increase quantity
            if (cartProduct.name == productName) {
                productQuantity = cartProduct.quantity;
                productQuantity++;
            }
        }
        // add product to cart (local storage) and update cart status
        var product = { 'value': productValue, 'name': productName, 'price': productPrice, 'quantity': productQuantity };
        setStorageItem(product.name, product);
        console.log("update local storage successfull " + productPrice);
        updateCartStatus();
        window.scrollTo(0, 0);
    });
    $('.view-cart').click(function () {
        window.location.href = 'file:///home/cuong/site/mysite/cart.html';
    });
    $('.clear-cart').click(function () {
        localStorage.clear();
        updateCartStatus();
    });
});
$(document).click(function (event) {
    if (!$(event.target).closest('.dropdown-content').length && !$(event.target).closest('.dropdown-btn').length) {
        var dropdowns = $('.dropdown-content');
        if (dropdowns.hasClass('show')) {
            dropdowns.removeClass('show');
        }
    }
});
var updateCartStatus = function () {
    var cartDropdownBtn = $(".cart-dropdown-btn");
    var cartElement = $(".cart");
    var CartDropdownContentString = '';
    var quantity = 0;
    var totalPrice = 0;
    if (localStorage.length == 0) {
        CartDropdownContentString = '<p class="cart-view">Your cart is empty</p>';
    }
    else {
        // if cart is NOT empty, loop through all products in local storage and assign them to string
        for (var i = 0, len = localStorage.length; i < len; ++i) {
            var product = getStorageItem(i);
            totalPrice += (product.quantity * product.price);
            quantity++;
            CartDropdownContentString += "\n        <div class=\"row\">\n          <div class=\"col-3\">\n            <img src=\"images/" + product.value + ".jpg\" alt=\"\" class=\"product-square-img\">\n          </div>\n          <div class=\"col-9 cart-detail\">\n            " + product.name + "<br>x " + product.quantity + "<br>$" + product.price + "\n          </div>\n        </div>";
        }
        CartDropdownContentString += "\n      <button class=\"green-btn view-cart\">\n        VIEW CART\n      </button>\n      <button class=\"green-btn clear-cart\">\n        EMPTY CART\n      </button>";
    }
    // render the to cart status
    cartDropdownBtn.html("\n    <i class=\"fa fa-shopping-cart dropdown-btn\"></i>\n      " + quantity + " item(s) - $" + totalPrice + " \n    <i class=\"fa fa-caret-down dropdown-btn\"></i>");
    cartElement.html(CartDropdownContentString);
    console.log('update cart status successfull\n');
};
var createSelectListString = function (productQuantity) {
    var selectListString = '<select class="select-list" onChange="updateQuantity()">';
    for (var i = 0; i <= 10; i++) {
        if (productQuantity == i) {
            selectListString += "<option value=\"" + i + "\" selected=\"selected\">" + i + "</option>";
        }
        else {
            selectListString += "<option value=\"" + i + "\">" + i + "</option>";
        }
    }
    selectListString += '</select>';
    return selectListString;
};
function tableString() {
    var sum = 0;
    var tableString = "\n  <table class=\"table\">'\n    <thead><th>Id</th><th>Name</th><th>Price</th><th>Quantity</th><th>total</th>\n  </thead>\n  <tbody>";
    for (var i = 0, len = localStorage.length; i < len; ++i) {
        var product = JSON.parse(localStorage.getItem(localStorage.key(i)));
        var total = product.quantity * product.price;
        sum += total;
        tableString += "\n    <tr>\n      <td>" + product.value + "</td>\n      <td>" + product.name + "</td>\n      <td>" + product.price + "</td>\n      <td>" + createSelectListString(product.quantity) + "</td>\n      <td>$" + total + "</td>\n    </tr>";
    }
    tableString += "</tbody>\n  <tfoot>\n    <tr>\n      <td colspan=\"4\"><strong>sum</strong></td>\n      <td><strong>$" + sum + "</strong></td>\n    </tr>\n  </tfoot>";
    tableString += '</table>';
    return (tableString);
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
        tableElements.find('tbody').find('tr')[i].cells[4].innerHTML = "$" + totalPrice;
        sum += totalPrice;
        setStorageItem(product.name, product);
    }
    tableElements.find('tfoot').find('strong')[1].innerHTML = "$" + sum;
    updateCartStatus();
}
var currencyToNumber = function (argument) {
    return Number(argument.replace(/[^0-9\.]+/g, ""));
};
var getStorageItem = function (key) {
    return JSON.parse(localStorage.getItem(localStorage.key(key)));
};
var setStorageItem = function (name, item) {
    return localStorage.setItem(name, JSON.stringify(item));
};
var dropdownToggle = function () { };
