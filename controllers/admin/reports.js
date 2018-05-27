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

const monthNames = ["January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];  
var days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
var monthsObj = {jan:Number,feb:Number,march:Number,april:Number,may:Number,june:Number,july:Number,aug:Number,sep:Number,oct:Number,nov:Number,dec:Number,};
var meanMonthly = {jan:Number,feb:Number,march:Number,april:Number,may:Number,june:Number,july:Number,aug:Number,sep:Number,oct:Number,nov:Number,dec:Number,};
var message = [];
var arr = '';
var finalOut='';
var monthAnalysis = [0];
monthsObj.may=0;monthsObj.june=0;monthsObj.jan=0;monthsObj.july=0;monthsObj.feb=0; monthsObj.aug=0;monthsObj.march=0; monthsObj.april=0;monthsObj.sep=0;monthsObj.oct=0;monthsObj.nov=0;monthsObj.dec=0;//Similar for all
meanMonthly.may=0;meanMonthly.june=0;meanMonthly.jan=0;meanMonthly.july=0;meanMonthly.feb=0; meanMonthly.aug=0;meanMonthly.march=0; meanMonthly.april=0;meanMonthly.sep=0;meanMonthly.oct=0;meanMonthly.nov=0;meanMonthly.dec=0;//Similar for all

    if(req.method == "GET"){
        var sql="SELECT * FROM orders_history";
        db.query(sql, function(err, results){
            if(!err){
                for(var i =0;i< results.length;i++){
                    var date = (results[i].date);
                    var d = new Date(date*1000);
                    arr={"year":d.getFullYear(),"month":monthNames[d.getMonth()],"day":days[d.getDay()],"data":results[i]};
                    message.push(arr);
                }
              
                for(var i =0;i<message.length;i++){
                    switch(message[i].month){
                        case 'January':
                        monthsObj.jan++;
                        break;
                        case 'February':
                        monthsObj.feb++;
                        break;
                        case 'March':
                        monthsObj.march++;
                        break;
                        case 'April':
                        monthsObj.april++;
                        break;
                        case 'May':
                        monthsObj.may++;
                        break;
                        case 'June':
                        monthsObj.june++;
                        break;
                        case 'July':
                        monthsObj.july++;
                        break;
                        case 'August':
                        monthsObj.aug++;
                        break;
                        case 'September':
                        monthsObj.sep++;
                        break;
                        case 'October':
                        monthsObj.oct++;
                        break;
                        case 'November':
                        monthsObj.nov++;
                        break;
                        case 'December':
                        monthsObj.dec++;
                    }
                    
                }
                var sum = monthsObj.jan+monthsObj.feb+monthsObj.april+monthsObj.march+monthsObj.may+monthsObj.june+monthsObj.july+monthsObj.aug+monthsObj.sep+monthsObj.oct+monthsObj.nov+monthsObj.dec;;
                meanMonthly.may=0;meanMonthly.june=0;meanMonthly.jan=0;meanMonthly.feb=0; meanMonthly.aug=0;meanMonthly.march=0; meanMonthly.april=0;meanMonthly.sep=0;meanMonthly.oct=0;meanMonthly.nov=0;meanMonthly.dec=0;//Similar for all

                meanMonthly.jan/=sum;
                meanMonthly.feb=monthsObj.feb/sum;
                meanMonthly.march=monthsObj.march/sum;
                meanMonthly.april=monthsObj.april/sum;
                meanMonthly.may=monthsObj.may/sum;
                meanMonthly.june=monthsObj.june/sum;
                meanMonthly.july=monthsObj.july/sum;
                meanMonthly.aug=monthsObj.aug/sum;
                meanMonthly.sep=monthsObj.sep/sum;
                meanMonthly.oct=monthsObj.oct/sum;
                meanMonthly.nov=monthsObj.nov/sum;
                meanMonthly.dec=monthsObj.dec/sum;
                var sumMean = meanMonthly.jan+meanMonthly.feb+meanMonthly.april+meanMonthly.march+meanMonthly.may+meanMonthly.june+meanMonthly.july+meanMonthly.aug+meanMonthly.sep+meanMonthly.oct+meanMonthly.nov+meanMonthly.dec;
                var calcFac = sum/sumMean;
                var analyse = {'calculatedFactor':calcFac,'mean':meanMonthly,'sumMean':sumMean,'samesMonthly':monthsObj,'salesSum':sum};
                finalOut = {'analysis':analyse,'message':message};
                res.json(finalOut);
            }
            else{
                message = {"message":err,"error":"true"};
                res.json(message);
            }

        });
    }
};