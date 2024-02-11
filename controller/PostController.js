const Post = require('../model/Post')
const Auth = require('../model/Auth')
const Object = require('mongoose').Types.ObjectId



/// create new a place only admin 
// Special in the manager
const NewPlace = async (req, res) => {
    const {
        hours,
        address,
        phone,
        Howmany,
        Duration,
        addUser
    } = req.body
    try {

        let NewCreate = new Post({
            hours,
            address,
            phone,
            Howmany,
            Duration,
            user: req.user.id,
            addUser: addUser
        })

        let TheSave = await NewCreate.save()

        return res.status(201).json({
            message: TheSave
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// show all place only admin 
// Special in the manager
const ShowLastPost = async (req, res) => {

    try {

        let Show__ = await Post.find({}).select('_id address').limit(4).sort({ createdAt: -1 })



        return res.status(201).json(Show__)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// show all place only admin 
// Special in the manager
const ShowAll = async (req, res) => {

    try {

        let Show__ = await Post.find()



        return res.status(200).json(Show__)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// remove item of products
// Special in the manager
const Theremove = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: 'id is valid'
    })
    try {

        let TheRemove = await Post.deleteOne({ _id: req.params.id })


        return res.status(201).json(TheRemove)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// Updated
// Special in the manager
const TheUpdated = async (req, res) => {
    if (!Object.isValid(req.params.id)) return res.status(404).json({
        message: 'id is valid'
    })
    try {

        let TheRemove = await Post.updateOne({ _id: req.params.id }, { $set: req.body })


        return res.status(201).json(TheRemove)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// add user to workplaces 
// Special in the manager
const AddUserWorkPlaces = async (req, res) => {


    const { add } = req.body


    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: 'it is not real' })

    try {

        let SHOW__ = await Post.findOne({ _id: req.params.id })

        let CheckOut = await Post.findOne({ _id: req.params.id, "addUser.user": add })

        if (!CheckOut) {

            let Mahmoud = {
                user: add
            }

            SHOW__.addUser.push(Mahmoud)

            let thesave = await SHOW__.save()

            return res.status(200).json({
                message: 'The new customer has been added',
                result: thesave
            })
        }

        return res.status(200).json({
            message: 'The client already exists',
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}



// add User 
const AddUserAdmin = async (req, res) => {
    // const { NewData } = req.body

    // 65abb9fb012bd12ec247f427
    try {
        let SHOW__ = await Post.findOne({ _id: req.params.id })
        
        SHOW__.addUser.push(req.body)

        let thesave = await SHOW__.save()

        return res.status(200).json({
            message: 'The new customer has been added',
            result: thesave
        })

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// remove user of Post 
// Special in the manager
const RemoveUser = async (req, res) => {

    const { add } = req.body


    if (!Object.isValid(req.params.id)) return res.status(404).json({ message: 'it is not real' })

    try {

        let CheckOut = await Post.findOne({ _id: req.params.id, "addUser.user": add })

        if (!CheckOut) return res.status(404).json({ message: 'The client has been deleted', result: CheckOut })

        const newDeleteComment = CheckOut?.addUser?.filter((uxx) => uxx?.user?.toString() !== add?.toString())
        if (newDeleteComment) {


            CheckOut.addUser = newDeleteComment

            await CheckOut.save()
            return res.status(200).json({
                message: 'yes',
                result: CheckOut
            })
        }

        // CheckOut.remove()

        // await CheckOut.save()

        return res.status(404).json({
            message: 'it is real',
            result: CheckOut
        })
    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }

}


// show length of post and users
const ThecOUNT = async (req, res) => {
    try {
        let ThePost = await Post.countDocuments({})
        let TheAuth = await Auth.countDocuments({})

        return res.status(200).json({
            ThePost: ThePost,
            TheAuth: TheAuth
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

// show one post 
const OneProduct_ = async (req, res) => {
    try {
        let oneproduct = await Post.findById({ _id: req.params.id })
            .populate({ path: 'addUser.user', select: '_id email' })
            .select('address')

        return res.status(200).json(oneproduct)

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}


// show one post 
const SHOWofProduct = async (req, res) => {
    try {
        let oneproduct = await Post.findById({ _id: req.params.id })
        .select('hours address phone Howmany Duration _id')
         

        return res.status(200).json(oneproduct)

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
        let S__ = await Post.deleteMany({})


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
    SHOWofProduct,
    AddUserAdmin,
    OneProduct_,
    ShowLastPost,
    ThecOUNT,
    NewPlace,
    ShowAll,
    Theremove,
    TheUpdated,
    AddUserWorkPlaces,
    RemoveUser
}