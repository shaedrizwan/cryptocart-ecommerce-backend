const express = require('express')
const {initializeDB} = require('./database/db.connect')
const cors = require('cors')
const wishlistRouter = require('./routes/wishlist.route')
const cartRouter = require('./routes/cart.route')
const userRouter = require('./routes/user.route')
const productRouter = require('./routes/product.route')
const app = express()

initializeDB()
app.use(cors())
app.use(express.json())

app.use('/wishlist',wishlistRouter)
app.use('/cart',cartRouter)
app.use('/product',productRouter)
app.use('/user',userRouter)

app.get('/', (req, res) => {
  res.json({success:true,message:"Welcome to Cryptocart"})
})

app.get('/riz',(req,res)=>{
    res.json({success:true,message:"Welcome Rizwan to your webapp backend"})
})



// 404 - route (Should always at the end) 

app.use((err,req,res,next)=>{
    res.status(500).json({success:false,message:err.message})
})

app.use((req,res)=>{
    res.status(404).json({success:false,message:"Route not found"})
})

app.listen(process.env.PORT, () => {
  console.log(`Example app listening at http://localhost:${process.env.PORT}`)
})