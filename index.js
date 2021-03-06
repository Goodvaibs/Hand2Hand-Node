const express=require('express');
const app = express();


const bodyParser = require('body-parser');
const mongoconnect = require('mongoose');
require('dotenv/config');
const cors = require('cors');
const nodemailer = require('nodemailer');

const port = process.env.PORT || 3000;

var allowlist = ['https://h2h-angular-admin.herokuapp.com', 'https://h2h-angular.herokuapp.com', 'http://localhost:4201', 'http://localhost:4200']
var corsOptionsDelegate = function (req, callback) {
  var corsOptions;
  if (allowlist.indexOf(req.header('Origin')) !== -1) {
    corsOptions = { origin: true } // reflect (enable) the requested origin in the CORS response
  } else {
    corsOptions = { origin: false } // disable CORS for this request
  }
  callback(null, corsOptions) // callback expects two parameters: error and options
}

//Package middleware
app.use(cors(corsOptionsDelegate));
// app.use(bodyParser.json({limit: '50mb'}));
// app.use(bodyParser.urlencoded());
// app.use(bodyParser.json());
app.use(express.urlencoded({limit: '50mb',
parameterLimit: 100000,
extended: true}))
app.use(express.json({limit: '50mb'}))
//Db connection
mongoconnect.connect(process.env.DB_CONNECT,{
    useNewUrlParser:true,useUnifiedTopology:true},()=>{
        console.log('Mongodb Connected');
})

//Routes imports
const registerRoute = require('./Routes/Auth/registration');
const loginRoute = require('./Routes/Auth/login');
const passwordRoute = require('./Routes/Auth/password');
const masterRoute = require('./Routes/Master/master');
const postRoute = require('./Routes/Post/Post');
const userRoute = require('./Routes/User/user');
const notificationRoute = require('./Routes/Notification/notification');
const contactRoute = require('./Routes/Contact/Contact');
const discussionRoute = require('./Routes/Discussion_Forum/discussion_forum');
const subDiscussionRoute = require('./Routes/Discussion_Forum/subdiscussion_forum');
const forumRoute = require('./Routes/Forum/forum');
const forumCommentRoute = require('./Routes/Forum_comment/forum_comment');
const donateRoute = require('./Routes/Donate/donate');
const newsRoute = require('./Routes/News/news');
const eventRoute = require('./Routes/Event/event');
const mailRoute = require('./Routes/Mailer/mailer');
const newsletterRoute = require('./Routes/Newsletter/newsletter');
const imageRoute = require('./Routes/Image/image');
const popularPostRoute = require('./Routes/Post/Popularpost');

//Route middleware
app.use('/auth',registerRoute)
app.use('/login',loginRoute)
app.use('/password',passwordRoute)
app.use('/master',masterRoute)
app.use('/post',postRoute)
app.use('/user',userRoute)
app.use('/notification',notificationRoute)
app.use('/contact',contactRoute)
app.use('/comment',discussionRoute)
app.use('/subComment',subDiscussionRoute)
app.use('/forum',forumRoute)
app.use('/forumComment',forumCommentRoute)
app.use('/donate',donateRoute)
app.use('/news',newsRoute)
app.use('/event',eventRoute)
app.use('/mail',mailRoute)
app.use('/newsletter',newsletterRoute)
app.use('/image',imageRoute)
app.use('/popular-post',popularPostRoute)

//These is used to allow access to the images folder
app.use('/public',express.static('public'));  
app.use('/images', express.static('images')); 

//Server poor
app.listen(port,()=>{
    console.log('Port running at 3000');
})