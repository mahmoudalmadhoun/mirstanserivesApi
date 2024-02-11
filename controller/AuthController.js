const Auth = require('../model/Auth')
const Object = require('mongoose').Types.ObjectId
const bcrypt = require('bcrypt')
const { getToken } = require('../Jwt/index')
const ThePost = require('../model/Post')


// create new use 
const CreateNewUser = async (req, res) => {

    const {
        phone,
        password,
        email,
        personnummer,
        fullname,
    } = req.body


    try {
        let newCreate = await Auth.findOne({ phone: phone.trim() })
        if (newCreate) return res.status(404).json({ message: 'We have the same phone number' })

        const hasPassword = await bcrypt.hash(password, 10)
        let Testing = new Auth({
            phone,
            password: hasPassword,
            email,
            personnummer,
            fullname,
            showPassword : password
            // Usernumber :
        })

        let SaveData = await Testing.save()
        return res.status(201).json({
            message: 'A new account has been created',
            SaveData
        })


    } catch (error) {

        res.status(404).json({
            message: error.message
        })

    }
}

// login in ..... 
const login = async (req, res) => {

    const { phone, password } = req.body

    try {
        const user = await Auth.findOne({ phone })
        if (!user) return res.status(404).json({
            message: `Invalid phone number - ${phone}`
        })
        else {


            const isMatch = await bcrypt.compare(password, user.password)
            if (!isMatch) return res.status(404).json({ message: `The password is wrong` })

            return res.json({
                token: getToken(user._id),
                data: {
                    _id: user._id,
                    email: user.email,
                    phone: user?.phone,
                    isAdmin: user.isAdmin,
                    fullname : user?.fullname
                },
            })
        }
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}

// show all users only admin 
const ShowAll = async (req, res) => {

    try {
        let Show_ = await Auth.find({}).sort({ createdAt: - 1 })
            .select('phone personnummer total')
        return res.status(200).json(Show_)
    } catch (error) {

        res.status(404).json({
            message: error.message
        })

    }
}


// update user 
const Updated = async (req, res) => {

    // if (!Object.isValid(req.params.id)) return res.status(404).json({
    //     message: 'id is valid'
    // })

    try {

        let Updated = await Auth.updateOne({ _id: req.user.id },
            {
                $set: req.body
            }

        )

        return res.status(200).json({
            updated: Updated
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }


}


const AdminUpdated = async (req, res) => {

    // if (!Object.isValid(req.params.id)) return res.status(404).json({
    //     message: 'id is valid'
    // })

    try {

        let Updated = await Auth.updateOne({ _id: req.params.id },
            {
                $set: req.body
            }

        )

        return res.status(200).json({
            updated: Updated
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }


}

const ChangePassword = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: 'id is valid'
    })

    const { password } = req.body

    try {


        let user = await Auth.findOne({ _id: req.params.id })


        if (!password) return res.status(404).json({ message: 'the input is empty' })
        const hasPassword = await bcrypt.hash(password, 10)

        user.password = hasPassword
        user.showPassword = password

        await user.save()

        return res.status(200).json({
            message: 'Lösenordet har ändrats'
        })


    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// show one item 
const OneItem = async (req, res) => {
    try {
        let OneShow = await Auth.findOne({ _id: req.params.id })
        // .select('fullname _id  total half bankaccount personnummer phone email')

        return res.status(200).json({
            message: OneShow
        })
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


// remove user only admin 
const RemoveUser = async (req, res) => {
    try {
        await Auth.deleteOne({ _id: req.params.id })

        return res.status(200).json({
            message: 'remov'
        })
    }
    catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

// View workplaces2op
const ViewWorkPlaces = async (req, res) => {

    try {

        let showpost = await ThePost.find({ "addUser.user": req.user.id })
            .select('address _id phone')
        return res.status(200).json({
            length: showpost?.length,
            result: showpost
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// remove all data 
// only admin......
const RemoveAll = async (req, res) => {
    try {
        let S__ = await Auth.deleteMany({})


        return res.status(200).json(S__)

        res.st
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}



module.exports = {
    RemoveAll,
    CreateNewUser,
    ShowAll,
    OneItem,
    Updated,
    login,
    ChangePassword,
    RemoveUser,
    ViewWorkPlaces,
    AdminUpdated,
}


