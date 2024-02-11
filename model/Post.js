const mongoose = require('mongoose')


const PostSchema = mongoose.Schema({

    hours: {type : Number},
    address : {type : String},
    phone : {type : String},
    Howmany :{type : Number},
    Duration : {type : String},
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },
    addUser : [
        {
            user: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Auth',
            },
        }
    ]
},{
    timestamps: true,
})



module.exports = mongoose.model('Post', PostSchema)

