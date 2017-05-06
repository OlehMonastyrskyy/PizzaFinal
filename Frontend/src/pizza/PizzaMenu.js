/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = require('../Pizza_List');

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza_list");

function showFilters(pizzaCount) {
    var html_code = Templates.PizzaMenu_Filter({count : pizzaCount});
    var $node = $(html_code);

    $("#pizza_filters").append($node);
}

function showPizzaList(list) {
    //Очищаємо старі піци в кошику

    // $('div[id^="my"]')
    $("#pizza_filters").find('li[id^="filter-button"]').click(function(event){
        filterPizza($(this).attr('id'));
    });

    $pizza_list.html("");

    //Онволення однієї піци
    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});

        var $node = $(html_code);

        $node.find("#pizza_buy_big").click(function(){;
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find("#pizza_buy_small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });
        $node.find("#clear_card").click(function(){
            PizzaCart.removeFromCart(pizza);
        });

        $pizza_list.append($node);
    }

    list.forEach(showOnePizza);
}

function filterPizza(filter) {
    //Масив куди потраплять піци які треба показати
    $node = $("#pizza_filters");
    var pizza_shown = [];

    Pizza_List.forEach(function(pizza){
        if(filter === 'filter-button-all') {
            pizza_shown.push(pizza);
        }
        if (filter === 'filter-button-meat' && pizza.content.meat !== undefined) {
            pizza_shown.push(pizza);
        }
        if (filter === 'filter-button-pineapples' && pizza.content.pineapple !== undefined) {
            pizza_shown.push(pizza);
        }
        if (filter === 'filter-button-mushrooms' && pizza.content.mushroom !== undefined) {
            pizza_shown.push(pizza);
        }
        if (filter === 'filter-button-ocean' && pizza.content.ocean !== undefined) {
            pizza_shown.push(pizza);
        }
        if (filter === 'filter-button-tomato' && pizza.content.tomato !== undefined) {
            pizza_shown.push(pizza);
        }
    });

    $('.badge').text(pizza_shown.length);
    //Показати відфільтровані піци
    showPizzaList(pizza_shown);
}

function showMaimMenu() {
    var html_code = Templates.PizzaMain_menu();
    var $node = $(html_code);

    $("#pizza_filters").append($node);
}

function initialiseMenu() {
    showMaimMenu();
    showFilters(Pizza_List.length);
    //Показуємо усі піци
    showPizzaList(Pizza_List)
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;
