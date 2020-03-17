/**
 * Created by chaika on 02.02.16.
 */
var Templates = require('../Templates');

//Перелік розмірів піци
var PizzaSize = {
    Big: "big_size",
    Small: "small_size"
};
var Filters = {
    Meat: 'М’ясна піца',
    Pineapple: "pineapple",
    Mushroom: "mushroom",
    Sea: 'Морська піца',
    Vega : 'Вега піца'
  };

//Змінна в якій зберігаються перелік піц в кошику
var Cart = [];

//HTML едемент куди будуть додаватися піци
var $cart = $("#p_cart");
  
function addToCart(pizza, size) {
    //Додавання однієї піци в кошик покупок
    idx = Cart.findIndex(item=>item.pizza == pizza && item.size == size);
    if(idx<0){
      Cart.push({
        pizza: pizza,
        size: size,
        quantity: 1,
        editable: !(window.location.href.indexOf("order")>0)
    });
    }
    if(idx>-1){
      Cart[idx].quantity += 1;
    }

    localStorage.setItem('items', JSON.stringify(Cart));
    updateTotalSum();
    //Оновити вміст кошика на сторінці
    updateCart();
    console.log(Cart);
}

function updateTotalSum(){
    var amnt = Cart.length;
    
  }
  function removeFromCart(cart_item) {
      //Видалити піцу з кошика
      //TODO: треба зробити
      idx = Cart.findIndex(item=>item.pizza == cart_item.pizza);
      Cart.splice(idx, 1);
      localStorage.setItem('items', JSON.stringify(Cart));
      //Після видалення оновити відображення
      updateCart();
  }

  function initialiseCart() {
    if (localStorage.getItem('items')) {
      items = JSON.parse(localStorage.getItem('items'));
      Cart = items;
      
    } else {
      items = []
    }
    for(var i = 0; i<Cart.length; i++){
      Cart[i].editable =  !(window.location.href.indexOf("order")>0);
    }
    localStorage.setItem('items', JSON.stringify(Cart));
    updateCart();
    
    $("#buy").click(function() {
         if (Cart.length>0) {
          window.location.assign("order");
          for(var i = 0; i<Cart.length; i++){
            Cart[i].editable =  (window.location.href.indexOf("order")>0);
          }
          localStorage.setItem('items', JSON.stringify(Cart));
          updateTotalSum();
          updateCart();
       }
      });
      $("#editOrder").click(function() {
        if (Cart.length>0) {
         window.location.assign("/");
         for(var i = 0; i<Cart.length; i++){
          Cart[i].editable =  (window.location.href.indexOf("order")>0);
        }
        localStorage.setItem('items', JSON.stringify(Cart));
        updateTotalSum();
        updateCart();
      }
     });
}
function getPizzaInCart() {
    //Повертає піци які зберігаються в кошику
    return Cart;
}

function updateCart() {
    $cart.html("");

    function showOnePizzaInCart(cart_item) {
        var html_code = Templates.PizzaCart_OneItem(cart_item);
        var $node = $(html_code);

        $node.find("#green").click(function(){
            //Збільшуємо кількість замовлених піц
            cart_item.quantity += 1;
            updateCart();
        });
        $node.find("#red").click(function(){
          if(cart_item.quantity>1){
          cart_item.quantity -= 1;
          } else{
            removeFromCart(cart_item);
          }
          updateCart();
      });
      $node.find("#delete").click(function(){
          removeFromCart(cart_item);
          updateCart();
    });
        $cart.append($node);
    }
    Cart.forEach(showOnePizzaInCart);
    $("#p_count").text(Cart.length);
    var totalSum = 0;
    for(var i=0;i<Cart.length;i++){
      totalSum+=Cart[i].quantity * Cart[i].pizza[Cart[i].size].price;  
    }
    $("#buy-pizza span").text(totalSum);
    $("#clear_orders").click(function(){
      for(var i = 0; i<Cart.length;)
      removeFromCart(Cart[i]);
      localStorage.clear();
   });
}

exports.removeFromCart = removeFromCart;
exports.addToCart = addToCart;

exports.getPizzaInCart = getPizzaInCart;
exports.initialiseCart = initialiseCart;

exports.PizzaSize = PizzaSize;
