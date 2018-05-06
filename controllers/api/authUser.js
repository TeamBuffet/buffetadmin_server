/*
    Created by Ankit on 06-05-18
*/

function initializePromise(userid,sql){

    return new Promise(function(resolve,reject){

        db.query(sql,[userid], function(err, results){
            if(!err){
                resolve(results);
            }
            else if(err){
                reject(err);
            }

        });

    })

}

exports.auth = function(req, res){
    var message = '';
    var sess = req.session;
    if(req.method == "POST"){
        var timestamp = req.body.timestamp;
        var userid= req.body.userid;
        var sql="SELECT * FROM `users_profile` WHERE `phone`=?";
       var existingCheck = initializePromise(userid,sql);
       existingCheck.then(function(result){
        message={"message":result, "error":"false"};
        console.log("exist"+result);
        res.json(message);
       },function(err){
           console.log("do not exist"+err);
           res.json(err);
       })
      
      /* db.query(sql,[userid], function(err, results){
            if(results.length){
                message={"message":results, "error":"false"};
            }
            else{
                message = {"message":"Invalid Credentials","error":"true"};
            }

        });
        */
    }
};