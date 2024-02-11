const express = require('express')
const app = express()
const cors = require('cors')
const morgan = require('morgan')
const path = require('path')
require('dotenv').config()
let port = process.env.PORT || 4000
const Db = require('./Db')
const Auth = require('./router/AuthRouter')
const Post = require('./router/PostRouter')
const TheTime = require('./router/TimeRouter')
// mahmoudtalat899
// DtOSwLDdUkKcIxlA
// mahmoud.talat899@gmail.com

Db()

app.use([
    express.json(),
    express.urlencoded({ extended: true }),
    morgan('dev'),
    cors({
        origin: 'http://localhost:3000',
        methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
        credentials: true
    })
])

app.use('/*', (req, res, next) => {
    res.setHeader('Last-Modified', (new Date()).toUTCString());
    next();
})


app.use('/api/',[Auth,Post,TheTime])

// app.use('/', (req,res)=>{

//     return res.status(200).json('hello')
// })


app.listen(port, () => {
    console.log(`Server Runig.....${port}`)
})
