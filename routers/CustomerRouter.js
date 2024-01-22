const router = require('express').Router()
const ApiResponse=require('../utils/ApiResponse')
const {BookOrder,Book,OrderItem} = require('../models')

router.use((request,response,next)=>{
    if(request.user.type=='customer'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Only Admin Allowed !"))
    }
})

// order_date , customer , delivery_status
//  {
//     amount  : ?, 
//     reference_no : ?, 
//     delivery_address : ?, 
//     books : [ {bid,qty} , {}] , 
// }

router.post("/book_order",async (request,response)=>
{
    const reqData=request.body;
    console.log(reqData)

    var ob1={
        order_date:new Date(),
        customer:request.user.userid,
        amount:reqData.amount,
        payment_referenceno:reqData.payment_referenceno,
        delivery_address:reqData.delivery_address,
        delivery_status:"Pending"
    }
  const order=await BookOrder.create(ob1);
  for(const bk of reqData.books)
  {
 
const{bid,qty}=bk;
const book1=await Book.findOne({where:{id:bid}});
console.log(book1)
console.log(book1.selling_price)
let ob2={
    order:order.id,
    book:bid,
    amount:book1.selling_price,
    quantity:qty
}

await OrderItem.create(ob2);
  }

response.status(201).json(new ApiResponse(true,"Order Saved !"))

})


module.exports=router
