 const { response } = require('express')
const jwt = require('jsonwebtoken')
const router=require('express').Router()
const ApiResponse=require("../utils/ApiResponse")
const cateRouter=require("./CategoryRouter")
const bookRouter = require('./BookRouter')
const customerRouter=require('./CustomerRouter')

router.use((request,response,next)=>
{
    const authHeader=request.headers.authorization;
    
    const token=authHeader && authHeader.split(' ')[1]
   // console.log(token)

   if(token==undefined || token.length==0 || token.length==null)
{
response.status(500).json(new ApiResponse(false,"Token Not Found !",null,"No Token Found !"))
}else{
    jwt.verify(token,process.env.TOKEN_SECRET,(err,tokenData)=>
    {
if(err){
    response.status(500).json(new ApiResponse(false,"Invalid or Expired Token !",null,"Wrong Token found !"))

}else{
    const {userid,type}=(tokenData)
    request.user={userid,type}
    next()
}
    })
}
})
 router.use("/category",cateRouter)
 router.use("/book",bookRouter)
 router.use("/cust",customerRouter)




module.exports=router