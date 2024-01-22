module.exports = (err)=>
{
        return err.errors.map(ob=>{
            return {field:ob.path,message:ob.message}
        })
}