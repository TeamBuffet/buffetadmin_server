/*
 * Created by Ankit on 01/10/17.
*/

exports.auth = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){

        var pass= req.body.password;
        var sql="SELECT * FROM `admin_credential` WHERE `password`=?";
        db.query(sql,[pass], function(err, results){
            if(results.length){
            //    sess.user = results[0].id;
                message={"message":"Welcome", "error":"false"};
                res.json(message);
            }
            else{
                message = {"message":"Invalid Credentials","error":"true"};
                res.json(message);
            }

        });
    }
};