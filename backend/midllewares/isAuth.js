import jwt from "jsonwebtoken"
const isAuth=async(req,res,next)=>{
    try {
        // Read token from cookies or from standard Authorization header or custom header
        const token = req.cookies.token || 
                      req.headers.authorization?.split(" ")[1] || 
                      req.headers.token;
                      
        if(!token){
            return res.status(400).json({message:"token not found"})
        }
        const verifyToken=await jwt.verify(token,process.env.JWT_SECRET)
        req.userId=verifyToken.userId
        next()

    } catch (error) {
        console.log("Authentication error:", error)
        return res.status(500).json({message:"is Auth error"})
        
    }
}
export default isAuth