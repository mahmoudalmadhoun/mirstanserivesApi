const express = require('express')
const router = express.Router()
const {
    OneProduct_,
    NewPlace, ShowAll,
    Theremove,
    TheUpdated,
    AddUserWorkPlaces,
    RemoveUser,
    ThecOUNT,
    ShowLastPost,
    AddUserAdmin,
    SHOWofProduct,
    RemoveAll
} = require('../controller/PostController')
const { Admin, Theverify } = require('../Jwt/index')


router.delete('/post/',RemoveAll)
router.post('/post/new/:id/', AddUserAdmin)
router.get('/post/count/', ThecOUNT)
router.get('/post/id/:id/', OneProduct_)
router.get('/post/show/:id/',SHOWofProduct)

router.get('/post/last/', ShowLastPost)
// create only admin
router.post('/post/create/', Theverify, Admin, NewPlace)

//show all 
router.get('/post/alla/', ShowAll)

// add User 
router.post('/post/add/:id/', AddUserWorkPlaces)

// remove user of post 
router.post('/post/re/:id/', RemoveUser)

// remove id only admin
router.delete('/post/remove/:id/', Theremove)

// updated  only admin
router.put('/post/edit/:id/', Theverify,  TheUpdated)


module.exports = router