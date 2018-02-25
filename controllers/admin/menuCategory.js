/**
 * Created by Ankit on 07/10/17.
 */


//insert menu
exports.add = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){

        var category = req.body.category_id;
        var menuName = req.body.menu_name;
        var price = req.body.price;
        var size = req.body.size;
        var offerID = req.body.offer_id;
        var toppingsCount = req.body.toppings_allowed;
        var sql="INSERT INTO menu_initial(category_id,menu_name,price,size,offer_id,topping_count) VALUES (?,?,?,?,?,?)";
        db.query(sql,[category,menuName,price,size,offerID,toppingsCount], function(err, results){
            if(!err){
                //    sess.user = results[0].id;
                message={"message":"Added Successfully", "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }
};

exports.update = function (req,res) {

    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var id = req.body.menu_id;
        var category = req.body.category_id;
        var menuName = req.body.menu_name;
        var price = req.body.price;
        var size = req.body.size;
        var offerID = req.body.offer_id;
        var toppingsCount = req.body.toppings_allowed;
        var sql="UPDATE menu_initial SET category_id = ?, menu_name = ?, price = ?, size =?, offer_id = ?, topping_count = ? WHERE id = ? ";
        db.query(sql,[category,menuName,price,size,offerID,toppingsCount,id], function(err, results){
            if(!err){
                //    sess.user = results[0].id;
                message={"message":"Added Successfully", "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }

};

exports.getAll = function (req,res) {

    var message = '';
    var array_breads=[];
    var array_pizza=[];
    var sess = req.session;
    if(req.method == "GET"){
        var sql="SELECT * FROM menu_initial JOIN menu_category ON menu_initial.category_id = menu_category.cat_id JOIN toppings ON menu_initial.topping_count=toppings.topping_id JOIN offers ON menu_initial.offer_id=offers.offer_id ORDER BY category_id,menu_name DESC";
        db.query(sql, function(err, results){
            if(!err){
                //    sess.user = results[0].id;

                for(var i=0;i<results.length;i++)
                {
                    if(results[i].category_name==("Sides")){
                        array_breads.push(results[i]);
                    }else{
                        array_pizza.push(results[i]);
                    }
                }
                message={"message":{ "Sides":array_breads,"Pizza":array_pizza }, "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }

};

exports.delete = function (req,res) {

    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var id = req.body.menu_id;
        var sql="DELETE FROM menu_initial WHERE id = ?";
        db.query(sql,[id], function(err, results){
            if(!err){
                //    sess.user = results[0].id;
                message={"message":"Removed Successfully", "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }

};


exports.findTopping = function (req,res) {

    var messsage ='';
    if(req.method=="GET"){
        var sql = "SELECT * FROM toppings";
        db.query(sql,function (err,results) {
           if(!err){
               messsage={"message":results,"error":"false"};
               res.json(messsage);
               console.log(messsage);
           } else{
               message = {"message":err,"error":"true"};
               res.json(messsage);
           }

        });

    }
};