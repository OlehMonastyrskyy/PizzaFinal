/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#cart");

function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок

    var isQuantityChange = false;
    Cart.forEach(function(item, i, arr) {
        if(pizza.id == item.pizza.id && item.size === size){
            item.quantity++;
            isQuantityChange = true;
            updateCart();
        }
    });
    //Приклад реалізації, можна робити будь-яким іншим способом
    if (isQuantityChange){
        updateCart();
        return;
    }
    Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1
    });

    // console.log(Cart);
    localStorage.setItem("Cart", JSON.stringify(Cart));

    //Оновити вміст кошика на сторінці
    updateCart();
};

function createTotalPrice() {
    var totalSum = 0
    Cart.forEach(function (item) {
        if (item.size === 'big_size') {
            totalSum += item.quantity * item.pizza.big_size.price;
        } else {
            totalSum += item.quantity * item.pizza.small_size.price;
        }
        // totalSum += item.quantity * item.price;
    });

    return totalSum + ' грн';
}

function removeFromCart(cart_item) {
    //Видалити піцу з кошика
    Cart.forEach(function(item, i, arr) {
        if(cart_item.pizza.id == item.pizza.id){
            Cart.splice(i, 1);
            return;
        }
    });

    updateCart();
}

function clearAll() {
    Cart = [];
    updateCart();
}

function initialiseCart() {
    Cart = JSON.parse(localStorage.getItem("Cart"));
    // // var local = localStorage.Cart;
    //Фукнція віпрацьвуватиме при завантаженні сторінки
    //Тут можна наприклад, зчитати вміст корзини який збережено в Local Storage то показати його
    //TODO: ...

    updateCart();
}

function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    //Функція викликається при зміні вмісту кошика
    //Тут можна наприклад показати оновлений кошик на екрані та зберегти вміт кошика в Local Storage
    $cart.html("");
    $(document).find(".clear").click(function(){
        clearAll();
    });

    //Онволення однієї піци
    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);

        var $node = $(html_code);

        // $cart.html("");
        $node.find(".plus").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;

            //Оновлюємо відображення
            updateCart();
        });

        $node.find(".minus").click(function () {
            if (cart_item.quantity === 1) {
                removeFromCart(cart_item);
            } else {
                cart_item.quantity -=1;
            }
            updateCart();
        });

        $node.find("#removeFromCart").click(function () {
            removeFromCart(cart_item);
            updateCart();
        });

        $node.find("#clear_card").click(function(){
            removeFromCart(cart_item);
        });

        $cart.append($node);
    }

    if (Cart.length !== 0) {
        $cart.html("");
    }
    $(document).find(".badge").text(Cart.length);

    $(document).find(".sum-title").removeAttr("style");
    $(document).find(".sum-number").removeAttr("style").text(createTotalPrice());
    Cart.forEach(showOnePizzaInCart);
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;
exports.clearAll = clearAll;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;