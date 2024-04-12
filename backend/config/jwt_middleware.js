import jwt from "jsonwebtoken";
const cookieName = process.env.PROJECT_NAME;
const jwtSecret = process.env.JWT_SECRET

// verify token from cookie
export const jwtAuth = (req, res, next) => {
    const token = req.cookies[cookieName];
    try{
        const payload = jwt.verify(token, jwtSecret);
        req.user = payload
        next();
    }
    catch(err){
        res.status(401).json({ message: "Unauthorised" });
    }
}



