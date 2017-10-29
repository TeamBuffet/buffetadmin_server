/**
 * Created by Ankit on 29/10/17.
 */

exports.add = function(req, res){
    var message = '';
    if(req.method == "POST"){

        var url = req.param.blogImageUrl;
        var caption = req.param.blogCaption;
        var user = req.param.userId;
        var sql="INSERT INTO blog_feeds(user,url,caption) VALUES (?,?,?)";
        db.query(sql,[user,url,caption], function(err, results){
            if(!err){
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
    if(req.method == "GET"){
        var sql="SELECT * FROM (SELECT * FROM blog_feeds INNER JOIN users_profile ON blog_feeds.user=users_profile.user_id) AS First JOIN (SELECT COUNT(blog_likes.blog_id) AS Likes FROM blog_likes) AS Second";
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
