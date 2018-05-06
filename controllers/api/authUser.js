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

    });

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
        
        var sqlInsert = "UPDATE login_session SET timestamp = ?, login = ? WHERE user_id=?";
        db.query(sqlInsert,[timestamp,'true',result[0].user_id], function(err, results){
            if(!err){
                console.log("RESULTS--> "+result[0].user_id);
                message={"message":result, "error":"false"};
                res.json(message);
            }
            else if(err){
                console.log("error");
                message={"message":err, "error":"true"};
                res.json(message);
            }

        });
        console.log("exist"+result);
       },function(err){
           console.log("do not exist"+err);
           message={"message":err, "error":"true"};
           res.json(message);
       });
    }
};