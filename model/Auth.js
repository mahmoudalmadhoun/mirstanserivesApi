const mongoose = require('mongoose')


const AuthSchema = mongoose.Schema({

    fullname : {type : String},
    email: {type : String},
    password : {type : String},
    phone : {type : String},
    personnummer :{type : Number},
    total : {type : Number},
    half : {type : Number},
    totalMonths : [
        {
            name : {type : String},
            total : {type : Number},
        }
    ],
    Usernumber : {type : Number},
    showPassword : {type : Number},
    isAdmin: {
        type: Boolean,
        required: true,
        default: false,
    },
    bankaccount : {type : String},

},{
    timestamps: true,
})



module.exports = mongoose.model('Auth', AuthSchema)

