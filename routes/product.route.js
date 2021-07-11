const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware')

router.use('/',verifyToken)
router.route('/')
    .get((req,res)=>{
        res.send('Product route successful with token')
    })

module.exports = router