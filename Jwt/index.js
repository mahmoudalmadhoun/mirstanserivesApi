const Jwt = require('jsonwebtoken') 
const TheUser = require('../model/Auth')

const getToken = (id) => {


    console.log('show id', id)
    return Jwt.sign({ id }, process.env.SCRIPT_TOKEN, {
        expiresIn: '10d'
    })
}

 const Theverify = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {

        try {
            token = req.headers.authorization.split(' ')[1]
            const ud = Jwt.verify(token, process.env.SCRIPT_TOKEN)
            req.user = await TheUser.findById(ud.id).select('-password')

            next()

        } catch (error) {

           // console.error(error)
            return res.status(404).json({ message: 'token failed' })
        }

    }

    if (!token) return res.status(404).json({ message: 'Not authorized' })
}


 const  Admin =  (req,res,next)=>{

    if(req.user && req.user.isAdmin ) {
        next()
    }else{
        return res.status(200).json({message : 'You are not responsible..'})
    }
}


module.exports = {
    getToken,
    Theverify,
    Admin
}