/**
 * Created by Ankit on 27/12/17.
 */

//Activate service
exports.activate = function (req, res) {
    var message = '';
    if (req.method == "POST") {

        var mobile = req.body.mobile;
        var userID = req.body.userID;

        var sql = "INSERT INTO wallet_service(userID,mobile,service) VALUES (?,?,?)";
        db.query(sql, [userID, mobile, "Activate"], function (err, results) {
            if (!err) {
                message = {"message": "Added Successfully", "error": "false"};
                res.json(message);
            }
            else {
                message = {"message": err, "error": "true"};
                res.json(message);
            }

        });
    } else {
        message = {"message": " Method Request Invalid", "error": "true"};
        res.json(message);
    }


};


//Check Status of User's Wallet Service
exports.checkStatus = function (req, res) {

    var userID = req.body.userID;
    var sqlCheck = "SELECT * FROM wallet_service WHERE userID=" + userID;
    db.query(sqlCheck, function (err, results) {
        if (results.length) {
            message = {"message": "User Already Exists", "error": "true"};
            res.json(message);
        } else {
            message = {"message": "User Don't Exists", "error": "false"};
            res.json(message);
        }
    });

};



//getAllTransactions of User by ID

exports.getAllTransactions=function(req,res){

    var userID = req.body.userID;
    var sqlCheck = "SELECT * FROM wallet_transactions WHERE user_id=" + userID;
    db.query(sqlCheck, function (err, results) {
        if (!err) {
            message = {"message": results, "error": "false"};
            res.json(message);
        } else {
            message = {"message": "No Transactions Yet", "error": "true"};
            res.json(message);
        }
    });



};