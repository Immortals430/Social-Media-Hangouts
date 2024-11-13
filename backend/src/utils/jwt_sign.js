import jwt from "jsonwebtoken";
const jwtSecret = process.env.JWT_SECRET;


export const createToken = (obj) => {
    return jwt.sign(obj, jwtSecret, { expiresIn: "15 days" });
}


