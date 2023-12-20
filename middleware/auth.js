import jwt from "jsonwebtoken";
import 'dotenv/config';
 
export const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];
    if(token == null) return res.status(401).json({message: 'Please login.'});
    jwt.verify(token, process.env.ACCESS_TOKEN, (err, decoded) => {
        if(err) return res.status(403).json({message: 'Not authorized!'});
        res.locals.user_id = decoded.userId;
        next();
    })
}