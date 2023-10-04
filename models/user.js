const mongoose = require("mongoose");
//const validator=require("validator");

const userscehma = mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 3
    },
   

    // email:{
    //     type:String,
    //     required:true,
    //     validate(value){
    //         if(validator.isEmail(value)){
    //             throw new Error("invalid Email id")
    //         }
    //     }
    // },

    email: {
        type: String,
        required: true

    },
    password: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }


})

//we need to create a collection
const User = mongoose.model("User", userscehma);

module.exports = User;
