import jwt from 'jsonwebtoken';

export default function(req,res,next){
    try {
        const token = req.cookies.token;
        if (!token) {
        return res.status(401).json({ message: "Not logged in" });
        }
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).json({message:error.message})
    }
}