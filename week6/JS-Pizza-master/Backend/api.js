/**
 * Created by chaika on 09.02.16.
 */
var Pizza_List = require('./data/Pizza_List');
var PUBLIC_LIQ_KEY = 'sandbox_i96015957513';
var PRIVATE_LIQ_KEY = 'sandbox_3G4iOkK1WlEwf9Cczinpofxi3vSDw30JVtMW44Hb';

var crypto = require('crypto');

function sha1(string) {
    var sha1 = crypto.createHash('sha1');
    sha1.update(string);
    return sha1.digest('base64');
}

function base64(str) {
    return new Buffer(str).toString('base64');
}


exports.getPizzaList = function(req, res) {
    res.send(Pizza_List);
};

exports.createOrder = function(req, res) {
    var order_info = req.body;
    console.log("Creating Order", order_info);

    var order = {
        version: 3,
        public_key: PUBLIC_LIQ_KEY,
        action: "pay",
        amount: order_info.amount,
        currency: "UAH",
        description: order_info.description,
        order_id: Math.random(),
        //!!!Важливо щоб було 1, бо інакше візьме гроші!!!
        sandbox: 1
    };
    var data = base64(JSON.stringify(order));
    var signature = sha1(PRIVATE_LIQ_KEY + data + PRIVATE_LIQ_KEY);

    res.send({
        success: true,
        data: data,
        signature: signature
    });
};