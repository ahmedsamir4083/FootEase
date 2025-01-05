const express = require('express');
const router = express.Router();
const Organization = require("../models/orgModel");
const passport = require('passport');



router.get('/orgsignup',(req,res)=>{
    res.render('orgSignup')
})

router.post('/orgsignup', async(req,res)=>{
    const {email , 
        username ,
        password,
        orgName,
        contactPerson,
        // contactEmail,
        phoneNumber,
        orgType,
        footballType,
        location,
        Address,
        website,
        socialMediaLinks,
        description,
        TypesofFootballOpportunitiesProvided,
        SkillLevels,
        AgeGroups}= req.body;
    const org = new Organization({email,
        username,
        orgName,
        contactPerson,
        // contactEmail,
        phoneNumber,
        orgType,
        footballType,
        location,
        Address,
        website,
        socialMediaLinks,
        description,
        TypesofFootballOpportunitiesProvided,
        SkillLevels,
        AgeGroups});
    const regorg = Organization.register(org, password);
    res.redirect('/orgLogin')
})

router.get('/orglogin', (req,res) =>{
    res.render('orgLogin')
})


router.post ('/orglogin', passport.authenticate('local', {FailureRedirect:'/orglogin'}), async (req,res) =>{
    const username = req.body.username;
    const org = await Organization.find({"username": username})
    const id = org[0]._id;
    // res.redirect('/orgpportal/'+id)
    res.redirect('/orgpportal/'+id)
})

router.get('/orgpportal/:id', async (req,res) =>{
    const id = req.params.id
    const organization = await Organization.findById({"_id": id});
    res.render('orgPortal',{organization})
})

router.get('/addorginfo', (req,res) =>{
    res.render('addOrgInfo')
})

// router.post('/addorginfo', (req,res) =>{
//     const {Brief,Footballtypes,facilities,ClubContact,Address}= req.body;
//     const org = new OrganizationInfo({Brief,Footballtypes,facilities,ClubContact,Address})
// })

module.exports = router;