const mongoose= require("mongoose");
const passportLocalMongoose = require("passport-local-mongoose")
const Schema = mongoose.Schema;


const orgSchema = new Schema({
 email : {
    type:String,
    required: true,
    uniqe: true
 },
 orgName : {
   type:String
 },
 contactPerson : {
   type:String
 },
//  contactEmail : {
//    type:String
//  },
 phoneNumber : {
   type:String
 },
 orgType : [{
   type:String
 }],
 footballType : [{
   type:String
 }],
 location : {
   type:String
 },
 Address : {
  type:String
},
 website : {
   type:String
 },
 socialMediaLinks : {
   type:String
 },
 description : {
   type:String
 },
 TypesofFootballOpportunitiesProvided : [{
   type:String
 }],
 SkillLevels : [{
   type:String
 }],
 AgeGroups : [{
   type:String
 }]

});

orgSchema.plugin(passportLocalMongoose);

module.exports = mongoose.model("Organization", orgSchema);