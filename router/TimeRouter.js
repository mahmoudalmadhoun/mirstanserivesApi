const express = require('express')
const router = express.Router()
const {AddTime, ShowUserTime,RemoveAll, TestTime,  CreateNotPlaces, ShowALLTime} = require('../controller/timeController')
const {Admin,Theverify} = require('../Jwt/index')



router.get('/time/:id/',ShowALLTime)

// create only admin
router.post('/time/create/', Theverify,  AddTime)
// create new a place without place
router.post('/time/create/:id/',Theverify, CreateNotPlaces)
router.get('/time/show/:id/', ShowUserTime)
router.delete('/time/remove/',  RemoveAll)


module.exports = router

