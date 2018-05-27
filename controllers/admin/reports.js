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