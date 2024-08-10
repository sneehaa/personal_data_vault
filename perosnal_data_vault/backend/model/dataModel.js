const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    fullName :{
        type : String,
        required : true,
        trim : true,
    },
    dateOfBirth :{
        type : Date,
        required : true,
        trim : true,
    },
    address :{
        type : String,
        required : true,
        trim : true,
    },
    phoneNumber :{
        type : Number,
        required : true,
        trim : true,
    },
    email :{
      type : String,
      required : true,
      trim : true,
  },
    dataImageUrl : {
        type : String,
        required : true,
    },
    createdAt :{
        type : Date,
        default : Date.now(),
    }

})

const Data = mongoose.model('data', dataSchema);
module.exports = Data;