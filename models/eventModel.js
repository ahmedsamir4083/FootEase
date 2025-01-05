const mongoose= require("mongoose");
const Schema = mongoose.Schema;


const eventSchema = new Schema({

 eventName : {
    type:String,
    required: true,
    },
footballType : {
    type:String,
    required: true,
    },
location : {
    type:String,
    required: true,
    },

    Fees : {
        type:Number,
        required: true,
        },

date : {
    type:String,
    required: true,
},
});

module.exports = mongoose.model("Event", eventSchema);