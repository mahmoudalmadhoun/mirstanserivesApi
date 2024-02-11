const TheTime = require('../model/time')
const Object = require('mongoose').Types.ObjectId
const Auth = require('../model/Auth')


// 1 create new user if is not exeist
// 2 create new place if is not exeist
// 3 add working time of the day .... validation important 
// 4 According to the working hours upon completion of work send requiret to user databas

// 07 + 10 = 

const CreateNotPlaces = async (req, res) => {

    const { address, what, start, end, total, half } = req.body


    try {
        let createnewworing = {
            address: address,
            what: what,
            start: start,
            end: end,
            date: new Date()
        }

        let user = req.user._id

        let checkout = await TheTime.findOne({ user: user })


        if (checkout) {

            checkout.notplace.push(createnewworing)
            let thesave = await checkout.save()

            await Colulchan(req, res, user, total, half)
            console.log('show result last',total, half)
            return res.status(201).json({
                message: 'create new place',
                data: thesave
            })

        } else {

            let newcreate = new TheTime({
                user: req.user._id,
                notplace: [
                    createnewworing
                ]
            })

            let thesave = await newcreate.save()
            await Colulchan(req, res, user, total, half)
            console.log('show result first',total, half)
            return res.status(201).json({
                message: 'create new place',
                data: thesave
            })
        }

    } catch (error) {
        return res.status(404).json({ message: error.message })
    }
}
const AddTime = async (req, res) => {

    let {
        CheckPost,
        what,
        start,
        end,
        total,
        half
    } = req.body

    // req user 
    // req post id 



    try {

        let user = req.user._id
        // create time of today ...
        const createnewday = {
            what: what,
            start: start,
            end: end,
            date: new Date(),
        }

        // one box
        const newCreateCluom = {
            post: CheckPost,
            time: createnewday
        }


        let CheckUserId = await TheTime.findOne({ user: req.user._id })



        if (CheckUserId) {

            let CheckIdPost = await TheTime.findOne({ "places.post": CheckPost })

            if (!CheckIdPost) {


                // create new post with time everthing ...
                CheckUserId.places.push(newCreateCluom)
                let Nex = await CheckUserId.save()
                await Colulchan(req, res, user, total, half)
                return res.status(200).json({
                    message: 'no',
                    result: Nex
                })

            } else {

                // If a rule exists, add the time and day
                let addItime = CheckIdPost.places.find((so) => so?.post.toString() === CheckPost.toString())

                addItime.time.push(createnewday)

                let thSave = await CheckIdPost.save()
                await Colulchan(req, res, user, total, half)
                return res.status(200).json({
                    message: 'exists',
                    result: thSave
                })


            }

        } else {


            await Colulchan(req, res, user, total, half)
            await CreateNewUser(req, res, user, newCreateCluom)

        }

    } catch (error) {

        return res.status(404).json({
            message: error.message
        })
    }
}

// create new user and post 
async function CreateNewUser(req, res, user, newCreateCluom) {
    try {
        // only one time create 
        let NewCreate = await TheTime({
            user: user,
            places: newCreateCluom
        })
        let TheSave = await NewCreate.save()

        return res.status(200).json({
            message: 'A new account was created over time - first create',
            result: TheSave
        })
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}


async function Colulchan(req, res, user, total, half) {
    try {
        // only one time create 
        let auth = await Auth.findOne({ _id: user })

        // auth.total ? auth.total  === 
        let checkOut = auth?.total === undefined ? Number(0) : auth?.total
        let CheckOutHalf = auth?.half === undefined ? Number(0) : auth?.half

        auth.total = checkOut + total
        auth.half = CheckOutHalf + half

        await auth.save()

        // return res.status(200).json({
        //     show: thesave
        // })

    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

// show info of User
const ShowUserTime = async (req, res) => {

    try {
        let S__ = await TheTime.findOne({ user: req.params.id })
            .populate({ path: 'places.post', select: '_id address' })
            .populate({ path: 'user', select: '_id phone email personnummer totalMonths' })

        if (S__) return res.status(200).json(S__)

        return res.status(404).json({
            message: 'There is no user database'
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
        let S__ = await TheTime.deleteMany({})


        return res.status(200).json(S__)

        res.st
    } catch (error) {
        return res.status(404).json({
            message: error.message
        })
    }
}

const ShowALLTime = async (req,res)=>{
    try{
        let show = await TheTime.find({"places.post": req.params.id})
        .select('_id places')
        return res.status(200).json(show)
    }catch(error){
        return res.status(404).json({
            message : error.message
        })
    }
}




module.exports = {
    ShowALLTime,
    CreateNotPlaces,
    AddTime,
    ShowUserTime,
    RemoveAll,

}