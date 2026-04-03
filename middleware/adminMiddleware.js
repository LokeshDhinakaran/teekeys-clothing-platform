export default function(req,res,next) {
    try {
        if(!req.user || req.user.role!=="admin"){
            return res.status(403).json({message:"Access Denied only admin can accesss"})
        }
        next();
         
    } catch (error) {
        return res.status(500).json({message:error.message});
    }
}