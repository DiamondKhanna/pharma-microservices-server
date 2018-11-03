var express=require("express");
var bodyParser=require("body-parser");
var cors = require('cors');
var morgan=require('morgan');

var routes=require("./routes/routes.js");
var app=express();

app.use(cors());

app.use(morgan('dev',{
   skip: function(req,res)
   {
       return res.statusCode < 400
   }, stream: process.stderr 
}))
app.use(morgan('dev',{
    skip: function(req,res)
    {
        return res.statusCode > 400
    }, stream: process.stdout 
 }))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

routes.appRouter(app);

var server=app.listen(3001,function()
{
    console.log('application is running on port:',server.address().port);
})