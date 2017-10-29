/*
 * Created by Ankit on 07/10/17.
 */

//insert category
exports.add = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){

        var category = req.body.category;
        var subCategory = req.body.subCategory;
        var sql="INSERT INTO menu_category(category_name,sub_category_name) VALUES (?,?)";
        db.query(sql,[category,subCategory], function(err, results){
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
        var id = req.body.cat_id;
        var category = req.body.category;
        var subCategory = req.body.subCategory;
        var sql="UPDATE menu_category SET category_name = ?, sub_category_name = ? WHERE cat_id = ? ";
        db.query(sql,[category,subCategory,id], function(err, results){
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
    var sess = req.session;
    if(req.method == "GET"){
        var sql="SELECT * FROM menu_category";
        db.query(sql, function(err, results){
            if(!err){
                //    sess.user = results[0].id;
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

exports.delete = function (req,res) {

    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var id = req.body.cat_id;
        var sql="DELETE FROM menu_category WHERE cat_id = ?";
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