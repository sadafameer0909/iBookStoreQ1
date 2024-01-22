const express=require('express');
const router = express.Router()
const ApiResponse = require("../utils/ApiResponse")
const errorParser = require("../utils/ErrorParser")
const {Book,Seller} = require("../models")
const fileUpload = require('express-fileupload')
const {v4:uuidv4}=require('uuid');
const path=require('path')
const fs = require('fs')

router.use((request,response,next)=>{
    if(request.user.type=='admin' || request.user.type=='seller'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Only Admin Allowed !"))
    }
})
// router.use(express.urlencoded())
// router.use(fileUpload())
// book_name,publisher_name,author_name,selling_price,
// rental_price, image, isoldBook, trans_type, category 
// router.post("/save-book",async (request,response)=>
// {    
//     try{
//         const uploadFile = request.files.image;
//         console.log(uploadFile)
//         if(uploadFile==null||uploadFile===undefined)
//         {
//             response.status(500).json(new ApiResponse(false," Image not uploaded!",null,null))
//         }else{

//             if(uploadFile.mimetype.includes("image/"))
//             {
//                 const name=uuidv4()+path.extname(uploadFile.name);
//                  const filePath='./uploads/'+name;
//                    uploadFile.mv(filePath)
//                    const seller = await Seller.findOne({
//                     where : {user: request.user.userid}
//                 })
//                 const data = {...request.body,
//                     status:true,
//                     image:name,
//                     seller:seller.id};
        
//                 const book = await Book.create(data);
//                 const imageUrl = '/uploads/' + name;
//                 response.status(201).json(new ApiResponse(true,"Book Saved !",book,null))
        
//             }else{
//                 response.status(500).json(new ApiResponse(false,"BOOK image wrong Format !",null,"Wrong Format"))
//             }
//         }
//            }catch(err){
//         console.log(err)
//         response.status(500).json(new ApiResponse(false,"Book Not Saved !",null,null))
//     }
// })


// router.post("/save-book", async (request, response) => {
//     try {
//         const uploadFile = request.files.image;
        
//         if (uploadFile == null || uploadFile === undefined) {
//             return response.status(400).json({ success: false, message: "Image not uploaded!" });
//         }

//         if (!uploadFile.mimetype.includes("image/")) {
//             return response.status(400).json({ success: false, message: "Invalid image format!" });
//         }

//         const seller = await Seller.findOne({
//             where: { user: request.user.userid }
//         });

//         if (!seller) {
//             return response.status(404).json({ success: false, message: "Seller not found!" });
//         }

//         const name = uuidv4() + path.extname(uploadFile.name);
//         const filePath = './uploads/' + name;

//         uploadFile.mv(filePath, async (err) => {
//             if (err) {
//                 console.error(err);
//                 return response.status(500).json({ success: false, message: "Internal Server Error" });
//             }

//             try {
//                 const bookData = {
//                     ...request.body,
//                     status: true,
//                     image: name,
//                     seller: seller.id
//                 };

//                 const book = await Book.create(bookData);

//                 // Adjust the response according to your needs
//                 response.status(201).json({ success: true, message: "Book saved!", book });
//             } catch (error) {
//                 console.error(error);
//                 response.status(500).json({ success: false, message: "Internal Server Error" });
//             }
//         });
//     } catch (error) {
//         console.error(error);
//         response.status(500).json({ success: false, message: "Internal Server Error" });
//     }
// });


router.post("/save-book", async (request, response) => {
    try {
        const uploadFile = request.files.image;
        
        if (uploadFile == null || uploadFile === undefined) {
            return response.status(400).json({ success: false, message: "Image not uploaded!" });
        }

        if (!uploadFile.mimetype.includes("image/")) {
            return response.status(400).json({ success: false, message: "Invalid image format!" });
        }

        const seller = await Seller.findOne({
            where: { user: request.user.userid }
        });

        if (!seller) {
            return response.status(404).json({ success: false, message: "Seller not found!" });
        }

        const name = uuidv4() + path.extname(uploadFile.name);
        const filePath = './uploads/' + name;

        uploadFile.mv(filePath, async (err) => {
            if (err) {
                console.error(err);
                return response.status(500).json({ success: false, message: "Internal Server Error" });
            }

            try {
                const bookData = {
                    ...request.body,
                    status: true,
                    image: filePath, // Save the full path
                    seller: seller.id
                };

                const book = await Book.create(bookData);

                // Adjust the response according to your needs
                response.status(201).json({ success: true, message: "Book saved!", book });
            } catch (error) {
                console.error(error);
                response.status(500).json({ success: false, message: "Internal Server Error" });
            }
        });
    } catch (error) {
        console.error(error);
        response.status(500).json({ success: false, message: "Internal Server Error" });
    }
});



router.put("/:id",async (request,response)=>
{
    const id = request.params.id;
    const {book,desc} = request.body;

    try{
        const book = await Book.update({book_name,desc},{
            where : {id}
        });
        response.status(201).json(new ApiResponse(true,"Book Updated !",null,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Book Not Updated !",null,errorParser(err)))
    }
}) 

router.patch("/changeimage/:bookid",async (request,response)=>
{
    const bookid = request.params.bookid;
    
    try{
        var book = await Book.findOne({
            where : {id:bookid}
        })
        if(book==null)
        {
            response.status(500).json(new ApiResponse(false,"Book Not Found !",null,null))
        }else
        {  
            if(request.files==undefined || request.files.image==null || request.files.image==undefined)
            {
                response.status(500).json(new ApiResponse(false,"Book Image Not Uploaded !",null,null))
            }else
            {
                const uploadFile = request.files.image;
                if(uploadFile.mimetype.includes("image/"))
                {
                        fs.unlinkSync(path.join('./uploads',book.image));

                        const name = uuidv4() + path.extname(uploadFile.name);
                        const filePath = './uploads/'+name;
                        uploadFile.mv(filePath)
                        
                        book.image = name;
                        book.save();
                        response.status(200).json(new ApiResponse(true,"Book Image Changed !",null,null))
                }else{
                    response.status(500).json(new ApiResponse(false,"Book Image Wrong Format !",null,null))
                }
            }
        }
        
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Book Not Updated !",null,errorParser(err)))
    }
})

router.patch("/changestatus/:id",async (request,response)=>
{
    const bookid = request.params.bookid;

    try{
        const book = await Book.findOne({
            where : {id:bookid}
        })
        if(book==null)
        {
            response.status(201).json(new ApiResponse(false,"Image not found !",null,null))
    
        }else{

        }
        response.status(201).json(new ApiResponse(true,"Book Updated !",null,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Book Not Updated !",null,errorParser(err)))
    }
})
module.exports = router;