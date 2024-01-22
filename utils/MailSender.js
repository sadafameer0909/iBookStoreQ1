const nodemailer=require("nodemailer");



const transporter = nodemailer.createTransport({
service:"gmail",
host:"smtp.gmail.com",
port:587,
secure:false,
auth:{
    user:"justsample4mail@gmail.com",
    pass:"nnmohhfiokrcapqf",
},
});

module.exports=async(to,message,subject)=>
{
    const options={
    from: "justsample4mail@gmail.com", 
    to: to,
    subject: subject,
    html: message,  
}
try
{
    const info=await transporter.sendMail(options)
    return true;
}catch (error)
{
    console.log(error);
    return false;
}
}