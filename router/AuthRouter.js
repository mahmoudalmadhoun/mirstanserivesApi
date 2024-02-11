const express = require('express')
const router = express.Router()
const {RemoveAll,CreateNewUser, login,ShowAll, Updated,ChangePassword,RemoveUser,ViewWorkPlaces,OneItem, AdminUpdated} = require('../controller/AuthController')
const {Theverify,Admin} = require('../Jwt/index')


router.delete('/auth/', RemoveAll)
// login
router.post('/auth/login/', login)
// create
router.post('/auth/create/', CreateNewUser)

router.get('/auth/user/:id/',OneItem)
// view work 
router.get('/auth/show/',Theverify, ViewWorkPlaces)
// show all 
router.get('/auth/show/all/', ShowAll)
//update
router.put('/auth/edit/',Theverify, Updated)

//    ,
router.put('/auth/edit/:id/', AdminUpdated)
// remove 
// Theverify,Admin,
router.delete('/auth/remove/:id/',  RemoveUser)
// change password....
router.put('/auth/password/:id/',ChangePassword)



module.exports = router