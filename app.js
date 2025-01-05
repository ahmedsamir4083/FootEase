// if(process.env.NODE_ENV !== "production"){
// require('dotenv').config();
// }

const express = require('express');
const app = express();
const req = require('express/lib/request');
const path = require('path')
const mongoose = require('mongoose');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const User = require("./models/userModel");
const Organization = require("./models/orgModel");
const session = require('express-session');
// const MongoStore = require('connect-mongo');
const userRoutes = require('./routes/userRoute')
const orgRoutes = require('./routes/orgRoute')
const bodyParser = require('body-parser')
const flash = require('connect-flash')

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }))

// parse application/json
app.use(bodyParser.json())

// const dburl = process.env.DB_URL ||
mongoose.connect('mongodb://localhost/FootEase1',{
  useNewUrlParser: true, 
  useUnifiedTopology: true

});

const db = mongoose.connection;
db.on("error",console.error.bind(console, " connection error"))
db.once("open",()=>{
  console.log("db connected");
})




app.set('view engine','ejs');
app.set('views',path.join(__dirname,'views'))
app.use(express.static(__dirname + '/public'));

app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')))

const sessionConfig = {
  secret: 'thisshouldbeabettersecret!',
  resave: false,
  saveUninitialized: true,
  cookie: {
      httpOnly: true,
      expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
      maxAge: 1000 * 60 * 60 * 24 * 7
  }
}

// const secret = process.env.SECRET ||'thisshouldbeabettersecret!';


// const store = MongoStore.create({
//   mongoUrl: dburl,
//   touchAfter: 24 * 60 * 60,
//   crypto: {
//       secret,
//   }
// });

// const sessionConfig = {
//   // store,
//   name:'session',
//   secret: 'thisshouldbeabettersecret!',
//   resave: false,
//   saveUninitialized : true,
//   cookie:{
//       httpOnly:true,
//       expires: Date.now() + 1000 * 60 * 60 * 24 * 7,
//       maxAge: 1000 * 60 * 60 * 24 * 7
//   }
// }



app.use(session(sessionConfig))
app.use(flash());


app.use(passport.initialize());
app.use(passport.authenticate('session'));
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());

passport.use(new LocalStrategy(Organization.authenticate()));
passport.serializeUser(Organization.serializeUser());
passport.deserializeUser(Organization.deserializeUser());

app.use((req, res, next) => {
  console.log(req.session)
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
})





app.use('/', userRoutes);

app.use('/', orgRoutes);

// app.post('/login',
//   passport.authenticate('local', { failureRedirect: '/login', failureMessage: true }),
//   function(req, res) {
//     res.redirect('/');
//   });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server running on port ${PORT}`);
// });

if (require.main === module) {
  const PORT = 3000;
  const server = app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}


module.exports = app;