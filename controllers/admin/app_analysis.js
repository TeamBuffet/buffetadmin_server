exports.app_anal = function (req,res) {

    var messsage ='';
    if(req.method=="GET"){
        var sql = "select  * from app_analysis";
        db.query(sql,function (err,results) {
           if(!err){
               var tot_count = 0;
                for(var i = 0 ; i < results.length; i++){
                    console.log(results[i].app_counts);
                    tot_count += +results[i].app_counts;
                
            }
            messsage={"message":results,"error":"false"};
                messsage.total_app_counts = tot_count;
               res.json(messsage);
           } else{
               message = {"message":err,"error":"true"};
               res.json(messsage);
           }
        });

    }
};
