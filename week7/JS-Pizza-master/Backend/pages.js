/**
 * Created by chaika on 09.02.16.
 */
exports.mainPage = function(req, res) {
    res.render('mainPage', {
        pageTitle: 'Вибір Піци',
        editCart: true
    });

};

exports.orderPage = function(req, res) {
    res.render('orderPage', {
        editCart: false
    });
};