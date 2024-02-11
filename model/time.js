const mongoose = require('mongoose')



const TheTime = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Auth',
        required: true
    },

    places: [
        {
            post: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Post',

            },
            time: [
                {
                    what: { type: String },
                    start: { type: String },
                    end: { type: String },
                    date : {type : String},
        
                }
            ]

        },
    ],

    notplace: [
        {
            address: { type: String },
            what: { type: String },
            start: { type: String },
            end: { type: String },
            date : {type : String},
        }
    ]

}, {
    timestamps: true,
})



module.exports = mongoose.model('Time', TheTime)

