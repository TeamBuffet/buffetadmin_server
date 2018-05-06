/*
    Created By Ankit on 06-05-2018
*/

//Get Cart Data By User ID using Stored Preocdures

exports.getCartDataByID = function (req,res) {

    var messsage ='';
    if(req.method=="POST"){
        var userid = req.body.userid; 
        var sql = "CALL getCartItems(?)";
        db.query(sql,userid,function (err,results) {
           if(!err){
               messsage={"message":results[0],"error":"false"};
               res.json(messsage);
           } else{
               message = {"message":err,"error":"true"};
               res.json(messsage);
           }
        });

    }
};
