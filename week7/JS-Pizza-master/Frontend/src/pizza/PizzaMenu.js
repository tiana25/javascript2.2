/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');
var PizzaCart = require('./PizzaCart');
var Pizza_List = [];

//HTML едемент куди будуть додаватися піци
var $pizza_list = $("#pizza-list");

function showPizzaList(list) {
    $pizza_list.html("");

    function showOnePizza(pizza) {
        var html_code = Templates.PizzaMenu_OneItem({pizza: pizza});
        var $node = $(html_code);

        $node.find(".buy-big").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Big);
        });
        $node.find(".buy-small").click(function(){
            PizzaCart.addToCart(pizza, PizzaCart.PizzaSize.Small);
        });

        $pizza_list.append($node);
    }
    list.forEach(showOnePizza);
}
var $filterName = $("#filterName");
var $filterCount = $("#all_p");

function filterPizza(filter) {
    var pizza_shown = [];
    
    Pizza_List.forEach(function(pizza) {
      if (
        (filter === "" || filter.includes("Усі")) ||
        (filter.includes("М'ясні") && pizza.type.includes("М’ясна"))||
        (filter.includes("Вега") && pizza.type.includes("Вега")) ||
        (filter.includes("З ананасами") && pizza.content.pineapple) ||
        (filter.includes("З грибами") && pizza.content.mushroom) ||
        (filter.includes("З морепродуктами") && pizza.content.ocean)
          //Якщо піца відповідає фільтру
        )    pizza_shown.push(pizza);
    });
    //Показати відфільтровані піци
    if(filter.includes("Усі"))
      $filterName.text(filter +" піци");
    else
      $filterName.text(filter);

  $filterCount.text(pizza_shown.length);
  showPizzaList(pizza_shown);
}

function initialiseMenu(data) {
    //Показуємо усі піци
    var $menu = $(".btn-group-toggle");
    Pizza_List = data;
    $menu.on({
      "click": function() {
        filterPizza($menu.find(".focus.active").text())
      }
  });
  filterPizza("Усі");
}

exports.filterPizza = filterPizza;
exports.initialiseMenu = initialiseMenu;