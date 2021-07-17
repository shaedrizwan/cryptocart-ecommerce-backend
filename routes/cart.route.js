const express = require('express')
const router = express.Router()
const {verifyToken} = require('../middlewares/auth.middleware')
const User = require('../models/user.model')

router.use(verifyToken)
router.route('/')
    .get(async(req,res)=>{
        try{
            const userId = req.user
            const user = await User.findById(userId).populate('cart.product')
            res.json({success:true,cart:user.cart})
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

router.route('/add')
    .post(async(req,res)=>{
        try{
            const userId = req.user
            const {productId} = req.body
            const user = await User.findById(userId)
            const isProductPresent = user.cart.find(({product})=>String(product) === productId)
            if(isProductPresent){
                const index = await user.cart.findIndex(({product}) => String(product) === productId)
                user.cart[index].quantity = user.cart[index].quantity+1
                const updatedCart = await user.save()
                res.json({success:true,message:"Product quantity updated",cart:updatedCart.cart})

            }else{
                user.cart.push({product:productId,quantity:1})
                const updatedCart = await user.save()
                res.json({success:true,message:"Product successfully added",cart:updatedCart.cart})
            }
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

router.route('/remove')
    .post(async(req,res)=>{
        try{
            const userId = req.user
            const {productId} = req.body
            const user = await User.findById(userId)
            const index = await user.cart.findIndex(({product}) => String(product) === productId)
            if(user.cart[index].quantity === 1){
                user.cart.splice(index,1)
                const updatedCart = await user.save()
                res.json({success:true,message:"Product successfully Removed",cart:updatedCart.cart})
            }else{
                user.cart[index].quantity = user.cart[index].quantity-1
                const updatedCart = await user.save()
                res.json({success:true,message:"Quantity updated",cart:updatedCart.cart})
            }
        }catch(err){
            res.json({success:false,error:err.message})
        }
    })

module.exports = router