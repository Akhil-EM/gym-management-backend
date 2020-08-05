/// requiring needed modules
var express = require('express');
var chalk=require('chalk');
var mongoose=require('mongoose');
var bodyParser=require('body-parser');
var cors=require('cors');
const path=require('path');
const conStr="mongodb+srv://akhilem:9539770998@cluster0-rmbxp.mongodb.net/gym-management?retryWrites=true&w=majority";
var app = new  express();

//// requiring routers to use them
const userRouter=require('./src/routers/user')();
const adminRouter= require('./src/routers/admin')();
const qustiRouter=require('./src/routers/question')();
const fameRoute=require('./src/routers/wallOfFame')();
const SmaterialRoute=require('./src/routers/Smaterials')();
const gymRoute=require('./src/routers/gym')();

app.use(express.static(path.join(__dirname,"/public")));
/////using body parser to handle requestes
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended:true
}));

/// telling wich router must use on corressponding requestes

app.use('/users',userRouter);
app.use('/admin',adminRouter);
app.use('/question',qustiRouter);
app.use('/famewall',fameRoute);
app.use('/material',SmaterialRoute);
app.use('/gym',gymRoute);

app.get('/', function (req, res) {
  res.send('node works fine !!');
});


////checking mongo db connection 
//mongoose.connect("mongodb://localhost:27017/Quizlet_go");
//mongodb+srv://satckroots:stackroots7890@cluster0.ladhy.mongodb.net/gym-management?retryWrites=true&w=majority

mongoose.connect(conStr, {useNewUrlParser: true, useUnifiedTopology: true});
///mongoose.connect("mongodb+srv://satckroots:stackroot7890@cluster0.ladhy.mongodb.net/testdb?retryWrites=true&w=majority");
mongoose.set('useFindAndModify', false);
var db=mongoose.connection;
db.on('error',(error)=>{
    console.log(chalk.redBright(error));
});
db.once('open',()=>{
    console.log( chalk.blueBright( "Successfully connected with mongodb "));
})

// app.listen(4040, function () {
//   console.log(chalk.yellowBright("port 4040 is now active !!!"));
// });
app.listen(process.env.PORT||3000,()=>{
    console.log(chalk.yellowBright(`${chalk.blueBright("port "+process.env.PORT+"  is active")}`))
});
