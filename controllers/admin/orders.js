var Request = require("request");

exports.getAllOrders = function (req,res) {
Request.post('http://smartboxapp.esy.es/yp/api/admin/getunconfirmedorders.php',
        {form:{dcentre: "RDC Ghaziabad"}
    
}, (error, response, body) => {
    if(error) {
        return console.log(error);
        res.json(error);
    }
    console.log((JSON.parse(body)));
    res.json(JSON.parse(body));
});
}