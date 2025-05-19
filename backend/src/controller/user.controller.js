

export const getUser = async (req,res)=>{
    try {
        res.send("user route initiated successfully")
    } catch (error) {
        console.log("error in getUser controller",error);
        
    }
}