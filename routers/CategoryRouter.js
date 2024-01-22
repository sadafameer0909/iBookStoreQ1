const router = require('express').Router()
const ApiResponse = require("../utils/ApiResponse")
const errorParser = require("../utils/ErrorParser")

const {Category} = require("../models")

router.use((request,response,next)=>{
    if(request.user.type=='admin'){
        next()
    }else{
        response.status(500).json(new ApiResponse(false,"Unauthorized Access !",null,"Only Admin Allowed !"))
    }
})

// cate_name , desc
router.post("/",async (request,response)=>
{
    const data = {...request.body,status:true};
    try{
        const cate = await Category.create(data);
        response.status(201).json(new ApiResponse(true,"Category Saved !",cate,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Category Not Saved !",null,errorParser(err)))
    }
})

router.put("/:id",async (request,response)=>
{
    const id = request.params.id;
    const {cate_name,desc} = request.body;

    try{
        const cate = await Category.update({cate_name,desc},{
            where : {id}
        });
        response.status(201).json(new ApiResponse(true,"Category Updated !",null,null))
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Category Not Updated !",null,errorParser(err)))
    }
})

router.patch("/:id",async (request,response)=>
{
    const id = request.params.id;

    try{
        var cate = await Category.findOne({
            where : {id}
        })
        if(cate==null)
        {
            response.status(500).json(new ApiResponse(false,"Category Not Found !",null,null))
        }else
        {
            cate.status = !cate.status;
            cate.save();
            response.status(200).json(new ApiResponse(true,"Category Status Changed !",null,null))
        }
        
    }catch(err){
        response.status(500).json(new ApiResponse(false,"Category Not Updated !",null,errorParser(err)))
    }
})


module.exports = router;