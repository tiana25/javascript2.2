$(function(){

    var $proceedBtn = $("#order-proceed-btn");

function checkInput($input, warnMessage, re) {
    var $prnt = $input.parent();
    var $warn = $prnt.find(".warning");

    function test() {
        var str = String($input.val());
        var passes = str.length === 0 || re.test(str);

        if (!passes) {
            if (str.length !== 0)
                $prnt.addClass("error");
                // $prnt.removeClass("good");
        } else {
            if (str.length !== 0)
                // $prnt.addClass("good");
                $prnt.removeClass("error");
        }
        $warn.html(passes ? "" : warnMessage);
    }

    $input.change(test);
    $input.keypress(test);
    $input.on("input", test);
}
var $nameInput = $("#name-input");
var $phoneInput = $("#phone-input");
checkInput($nameInput, "Введіть тільки власне ім'я, без цифр!",
    /^[a-z а-яА-Я,.'-]+$/i);
checkInput($phoneInput, "Введіть номер телефону у форматі +380!",
    /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im);


    var liqPay = require('./LiqPay');

    $proceedBtn.click(function () {
        liqPay.initLiqPay();
    });
});