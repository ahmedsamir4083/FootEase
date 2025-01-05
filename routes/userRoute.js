const express = require('express');
const router = express.Router();
const User = require("../models/userModel");
const Organization = require("../models/orgModel");
const Event = require("../models/eventModel");
const passport = require('passport');
const flash = require('connect-flash');
const {isloggedin} = require("../helpers/isloggedin")
const joi = require('joi');


// const validateuser = (req,res,next) =>{
//   const {error} = userModel.validate(req.body);
//   if(error){

//       const msg = error.details.map(el =>el.message).join(',')
//       throw new ExpressErrors(msg,400);
//   } else{
//       next();
//   }
// }


router.get('/', (req,res) =>{
    res.render('home', {message: req.flash('success')})
})

router.get('/userhome/:id',isloggedin,async(req,res) =>{
  const id = req.params.id
  const user = await User.findById({"_id": id});
  res.render('userHome',{user})
})

router.get('/search',isloggedin, (req,res) =>{
    res.render('search') 
})

router.post('/search', isloggedin,async(req,res) =>{
    const {location,footballType,TypesofFootballOpportunitiesProvided,AgeGroups,level} = req.body;
    const result = await Organization.find({
        $or: [
          { "location": location },
          { "footballType": footballType },
          { "TypesofFootballOpportunitiesProvided": TypesofFootballOpportunitiesProvided },
          { "AgeGroups": AgeGroups },
          { "level": level }
        ]
      });
      res.render("searchResults",{result})
})


  router.get('/find',isloggedin, async(req,res) =>{
    const events = await Event.find({})
    res.render('find',{events});
    // res.send(events)
})

router.post('/find', async (req, res) => {
  try {
    const { eventName,footballType,location,Fees,date } = req.body;
    const event = new Event({ eventName,footballType,location,Fees,date});
    const savedEvent = await event.save();
    res.redirect("/find")

  } catch (error) {
    console.error(error);
    res.status(500).send('Internal Server Error');
  }
});

  router.get('/events', isloggedin,async(req,res) =>{
    const events = await Event.find().sort({ date: 1 });
    res.render('events',{events})
})


  router.get('/profile/:id', isloggedin,async(req,res) =>{
    const id = req.params.id
    const user = await User.findById({"_id": id});
    res.render('profile',{user})
})

router.post('/changedata/:id', isloggedin,async(req,res) =>{
  const {name , username} = req.body;
  const id = req.params.id
  const user = await User.findById({"_id": id});

  // if(password == user.password)
  // res.render('profile',{user})
  res.send(user)
})

router.get('/signup',(req,res)=>{
  res.render('signup',{message:req.flash('error')})
})

router.post('/signup',async(req,res)=>{
  // const joischema = joi.object({
  //   email: joi.string().email().required(),
  //   fullname: joi.string().required(),
  //   username:joi.string().required(),
  //   password:joi.string().required()
  // })
  // const {error} = joischema.validate(req.body);
  // if (error){
  //   const message = error.details.map(ms=> ms.message)
  //   req.flash('error',message);
  //   res.redirect('/signup')

  // }else{
    const {email , username , password ,fullname}= req.body;
    const user = new User({email,username,fullname});
    const regUser = await User.register(user, password);
    console.log(regUser)
    res.redirect('/login')
    // res.send(regUser);
  // }
})

router.get('/login', (req,res) =>{
    res.render('login' ,{message : req.flash('error')})
})


router.post ('/login', passport.authenticate('local', {FailureRedirect:'/login'}), async (req,res) =>{

  const username = req.body.username;
  const user = await User.find({"username": username})
  const id = user[0]._id;
  req.flash('success','Welcome back');
  res.redirect('/userhome/'+id)
})

// router.post ('/login',passport.authenticate('local', {failureRedirect:'/login'}), async(req,res) =>{
//   const username = req.body;
//  res.send(username)
//   // req.flash('success','Welcome back');
//   // res.redirect('/')
// })

router.get('/logout', (req,res) =>{
  req.logout(function (err) {
    if (err) {
        return next(err);
    }
    req.flash('success', 'Goodbye!!!!');
    res.redirect('/');
});
})

module.exports = router;