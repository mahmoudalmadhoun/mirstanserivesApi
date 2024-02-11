const mongoose = require('mongoose')

let Db = async ()=>{
    mongoose.connect(
        process.env.MONGOOSE_URL,
        {
            // useNewUrlParser: true,
            // useUnifiedTopology: true,
        },
    
        console.log('yes...')
    
     
    ).catch((error)=>{
        console.log('ERROR ........',error)
    })
}


module.exports = Db