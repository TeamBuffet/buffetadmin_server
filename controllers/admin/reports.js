exports.getAllCounts = function (req,res) {

    var message = '';
    if(req.method == "GET"){
        var sql="SELECT * FROM reports";
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

exports.analyse =(req,res)=>{


var message = [];
var arr = '';
    if(req.method == "GET"){
        var sql="SELECT * FROM orders_history";
        db.query(sql, function(err, results){
            if(!err){
                for(var i =0;i< results.length;i++){
                    var date = (results[i].date);
                    var d = new Date(date*1000);
                    var year = d.getFullYear();
                    arr={"year":year,"data":results[i]};
                    message.push(arr);
                }
                res.json(message);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }
};