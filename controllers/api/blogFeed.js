/**
 * Created by Ankit on 29/10/17.
 */

exports.add = function(req, res){
    var message = '';
    if(req.method == "POST"){

        var url = req.body.blogImageUrl;
        var caption = req.body.blogCaption;
        var user = req.body.userId;
        var timestamp = req.body.timeStamp;
        var sql="INSERT INTO blog_feeds(user,url,caption,timestamp) VALUES (?,?,?,?)";
        var sql1 = "INSERT INTO blog_likes(blog_id,likes) VALUES(?,?)";
        var sql2 = "SELECT * FROM blog_feeds ORDER BY blog_id DESC LIMIT 1"
        db.query(sql,[user,url,caption,timestamp], function(err, results){
            if(!err){
                message={"message":"Added Successfully", "error":"false"};
                db.query(sql2,function (err,result2) {
                    db.query(sql1,[result2[0].blog_id,0]);
                });
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
        var sql="(SELECT * FROM blog_feeds INNER JOIN users_profile ON blog_feeds.user=users_profile.user_id JOIN blog_likes ON  blog_likes.blog_id=blog_feeds.blog_id)";
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
