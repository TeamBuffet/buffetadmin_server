var Request = require("request");

exports.getRecommend = function (req,res) {
    var decision_based = req.body.dec; 
    var dec_based_factor=req.body.factor;
    var  dec_fac_value = req.body.valu;
Request.post('https://www.googleapis.com/prediction/v1.6/projects/machine-198802/trainedmodels/machine-198802/predict?key={AIzaSyCb8Gs9LpeRnmS0mpVAMNDCI3gZk8b3kdY}',
        {form:{
            "input": {
             "csvInstance": [
              decision_based
             ]
            }
           }
    
}, (error, response, body) => {
    if(error) {
        return console.log(error);
    }else{
    var data = JSON.parse(body);
    var db_rec='';
    var sql = "select  id, category_id, menu_name, price, size, offer_id, topping_count, image FROM menu_initial_learning  where" +dec_based_factor+"="+dec_fac_value;
    db.query(sql,function (err,results) {
       if(!err){
           db_rec={"message":results,"error":"false"};
       } else{
           db_rec = {"message":err,"error":"true"};
       }
    });
   
    db_rec.ml_google =  data.sort(function(a,b ){
        return a.outputMulti.score - b.outputMulti.score;
    });
    res.json(db_rec);
}
});
}
