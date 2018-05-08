/*
    Created By ANkit 08-05-2018
*/

//Get All Orders From DB
exports.getAll = function (req,res) {

    var message = '';
    if(req.method == "GET"){
        var sql="SELECT * FROM orders_history AS oh JOIN menu_initial AS mi ON oh.menu_id = mi.id JOIN toppings ON mi.topping_count=toppings.topping_id JOIN offers ON mi.offer_id=offers.offer_id";
        db.query(sql, function(err, results){
            if(!err){
                message={"message":results, "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }

};