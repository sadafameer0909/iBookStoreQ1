const router = require('express').Router()
const ApiResponse = require("../utils/ApiResponse")

const {trans_types} = require("../utils/StaticData")

const jwt = require('jsonwebtoken')
const {User,Customer,Seller,Category,Book, sequelize} = require('../models');

const errorParser = require("../utils/ErrorParser")
const sendMail = require('../utils/MailSender');
const { route } = require('./CategoryRouter');

function otpSender(name,email,otp)
{    
        const msg = `<html>
        <body>
            <h1>iT Book Store</h1>
            <hr>
            <h4>Welcome ${name} ..... </h4>
            <b>
                Your Registeration is successfully done. So please verify your account via this OTP : ${otp} .
            </b>
            <br><br>
            Thanks
            IT Book Store
        </body>
        </html>`
        sendMail(email,msg,"iTBook Store Email Verification");
}
function resendOtp(email,otp) {
  const msg = `<html>
      <body>
          <h1>iT Book Store</h1>
          <hr>
         
          <b>
              Resending OTP for verification. So please verify your account via this OTP : ${otp} .
          </b>
          <br><br>
          Thanks,
          IT Book Store
      </body>
      </html>`

  sendMail(email, msg, "iTBook Store OTP Resend");
}



// name,address,phone,email,password
router.post("/customer_reg",async (request,response)=>
{
    const reqData = request.body
    const tran = await sequelize.transaction()
    try
    {
      const otp = Math.floor(Math.random()*90000) + 10000;
        const {email,password} = reqData;
        const userData = { email,password,
                            type:'customer',
                            active_status:false,otp:otp}
        const user = await User.create(userData,{transaction:tran});
        
        const {name,address,phone} = reqData;    
        const custData = {name,address,phone,
                        email,user:user.id}   
        const customer = await Customer.create(custData,{transaction:tran}); 

        tran.commit()
 
        otpSender(name,email,otp);

        response.status(201).json(new ApiResponse(true,"Customer Saved !",customer,null))
    }catch(err)
    {
        tran.rollback();
        response.status(500).json(new ApiResponse(false,"Customer Not Saved !",null,errorParser(err)))
    }
})

// company_name,name,address,phone,email,password,gstno,regno,
router.post("/seller_reg",async (request,response)=>{
    const reqData = request.body
    
    try
    {
        const seller = await sequelize.transaction(async (t)=>
        {
            const {email,password} = reqData;
            const userData = { email,password,
                                type:'seller',
                                active_status:false,otp:otp}
            const user = await User.create(userData,{
                transaction : t
            });
            
            const {company_name,name,address,phone,gstno,regno} = reqData;    
            const sellerData = {company_name,name,address,
                            phone,gstno,regno,email,user:user.id}   
            const seller = await Seller.create(sellerData,{
                transaction : t
            }); 
            return seller;
        })
        trans.commit();
         otpSender(name,email,otp);
        response.status(201).json(new ApiResponse(true,"Seller Saved !",seller,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Seller Not Saved !",null,errorParser(err)))
    }
})
router.post("/login", async (request, response) => {
    const { email, password } = request.body;
    try {
      const user = await User.findOne({
        where: { email, password }
      });
      if (user == null) {
        response
          .status(500)
          .json(new ApiResponse(false, "Invalid User , Wrong Email or Password !"));
      } else {
        if(user.active_status){
        const token = jwt.sign(
          {
            userid: user.id,
            type: user.type
          },
          process.env.TOKEN_SECRET,
          { expiresIn: '50m' }
        );
        // Data User Name .....
        //Get User's name---------------------------
        let userName = null;
  
        if (user.type === "customer") {
          console.log("customer");
          const customer = await Customer.findOne({
            where: { email }
          });
          userName = customer ? customer.name : null;
        } else if (user.type === "seller") {
          console.log("seller");
          const seller = await Seller.findOne({
            where: { email }
          });
          userName = seller ? seller.name : null;
        } else if (user.type === "admin") {
          console.log("admin");
          userName = 'admin';
        }
        response.status(200).json(
          new ApiResponse(true, "Login Success!", {
            token,
            userName
          }, null)
        );
      }else{
        response.status(500).json(
          new ApiResponse(false, "Inactive account, please verify to login !"))
      }}
    } catch (err) {
      response
        .status(500)
        .json(new ApiResponse(false, "Login Failed !", null, err.message));
    }
  });
  router.post("/verify",async(request,response)=>
  {
    const{email,otp}=request.body
    const user=await User.findOne({
      where:{email,otp}
    })
    if(user==null){
      response.status(500).json(
        new ApiResponse(false, "Wrong Email or OTP!"))
    }else{

user.active_status=true;
await user.save();
response.status(200).json(
  new ApiResponse(true, "Verification Success!",null,null))
    }
  })
  router.post('/resend', async(request, response)=> {
        const email = request.body.email; 
        try {
          const user = await User.findOne({
            where: { email}
          });
          if (user == null) {
            response
              .status(500)
              .json(new ApiResponse(false, "This Email is not Registered!!, please enter valid email"));
          } else if(user.active_status==1) {
            response
            .status(500)
            .json(new ApiResponse(false, "This Email Id is already verified, please go to Login Page!! "));
          }else{
        const otp = Math.floor(Math.random()*90000) + 10000;
        const reOtp = {otp:otp}
const otp1 = await User.update({otp},{
    where:{email}
});
       console.log("OTP updated")
        // Send the resent OTP email
        resendOtp(email,otp);


        // Additional code for rendering the 'otp' view or handling responses
        response.status(200).send({
            success: true,
            message: 'Resent OTP successfully',
            data: otp1,
            error: null
        });
      }
    } catch (error) {
        console.error('Error resending OTP:', error);
        response.status(500).send({
            success: false,
            message: 'Error resending OTP',
            data: null,
            error: 'Internal Server Error'
        });
    }
});

router.get("/list/category",async (request,response)=>
{
    const data = await Category.findAll({
        where : {status:true},
        attributes:{
            exclude : ["status","createdAt","updatedAt"]
        }
    });
    response.status(200).json(new ApiResponse(true,"Category Data !",data,null)) 
})
router.get("/list/books",async (request,response)=>{
    const data = await Book.findAll({
        where : {status:true},
        include: [
          { model: Category, as: 'book_cate' },
          { model: Seller, as: 'book_seller' },
        ],
        attributes:{
            exclude : ["status","createdAt","updatedAt"]
        }
    });
    response.render('booktab', { books: data });
    response.status(200).json(new ApiResponse(true,"Book Data !",data,null)) 
})


router.get("/list/trans_types",async (request,response)=>
{
    response.status(200).json(new ApiResponse(true,"Book Transaction Type !",trans_types,null)) 
})

module.exports = router
