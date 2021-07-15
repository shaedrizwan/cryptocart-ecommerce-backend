const express = require('express')
const router = express.Router()
const User = require('../models/user.model')
const {verifyToken} = require('../middlewares/auth.middleware')

router.use(verifyToken)
router.route('/')
    .get(async(req,res)=>{
        try{
            const userId = req.user
            const user = await User.findById(userId).populate('wishlist')
            res.json({success:true,wishlist:user.wishlist})
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

router.route('/add')
    .post(async(req,res)=>{
        try{
            const userId = req.user;
            const {productId} = req.body;
            updatedUser = await User.findByIdAndUpdate({_id:userId},{
                $addToSet:{
                    wishlist:productId
                }
            })
            res.json({success:true,wishlist:updatedUser.wishlist})
        }catch(err){
            res.json({success:false,message:err.message})
        }
    })

    router.route('/remove')
    .post(async(req,res)=>{
        try{
            const userId = req.user
            const {productId} = req.body
            user = await User.findById(userId)
            updateWishlist = user.wishlist.pull(productId)
            updated = await user.save()
            res.json({success:true,wishList:user.wishlist})
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

module.exports = router