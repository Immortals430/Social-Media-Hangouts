import {User} from "../model/user_schema.js";
import jwt from "jsonwebtoken"
const jwtSecret = process.env.JWT_SECRET
const projectName = process.env.PROJECT_NAME
import {sendAccountCreationLink, sendResetLinkMail} from "../../config/nodemailer.js"
import { compare } from "bcrypt";
import { hash } from "bcrypt";
import sharp from "sharp";
import { getStorage, ref, uploadBytes,deleteObject  } from "firebase/storage";
import { jwtDecode } from "jwt-decode"
import { randomBytes } from "crypto";
import { Otp } from "../model/otp_schema.js";



// signup
export const signup = async (req, res) => {
    try{
        const { link } = req.query
        if(link){
            // confirm account creation
            const { username, email, password} = jwt.verify(link, jwtSecret)
            const hashPass = await hash(password, 10);
            await User.create({ username, email, password: hashPass })
            return res.status(201).json({
                success: true,
                message: "User created successfully"
            })
        }

        const user = await User.findOne({email: req.body.email})
        if(user){
            return res.status(409).json({
                success: false,
                message: "User already exist"
            })
        }

        // send confirm link
        const secret = jwt.sign(req.body, jwtSecret, {expiresIn: "15m"})
        sendAccountCreationLink(req.body.email, secret)
        return res.status(201).json({
            success: true,
            message: "Confirmation link will be sent to your email"
        })

    }
    catch(err){ 
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to signup"
        })}
    }


// signin
export const signin = async (req, res) => {
    try{
        const { email, password } = req.body;
        const user = await User.findOne({email}).select('+password').populate(['friendRequest', 'friends', 'post']);
        // if user data does not exist
        if(!user){
            return res.status(404).json({
                success: false,
                message: "user data does not exist in database"
            }) 
        }
        const result = await compare(password, user.password);
        // if password is incorrect
        if(!result){
            return res.status(401).json({
                success: false,
                message: "password incorrect"
            }) 
        }
        
        // if user is authorised
        let loggedUser = { ...user._doc }
        delete loggedUser.password
        const token = jwt.sign({
            id: user.id,
        }, jwtSecret, { expiresIn: '48h' });

        res.cookie(projectName, token, {
            expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)),
            sameSite: 'None',
            secure: true 
        })

        res.status(200).json({      
            success: true,
            message: "Signed in successfully",
            data: loggedUser,
            token: `${projectName}=${token}; expires=${new Date(Date.now() + (2 * 24 * 60 * 60 * 1000))}; path=/`

        })
    }
    catch(err){ 
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to signin"
        })}
    }


export const googleLogin = async (req, res) => {
    try{
        const { email, name } = jwtDecode(req.body.credential)
        let user = await User.findOne({email})
        if(!user){
            user = await User.create({
                username: name,
                email,
                password: randomBytes(20).toString('hex')
            })
        }
        
        let loggedUser = { ...user._doc }
        delete loggedUser.password
        const token = jwt.sign({
            id: user.id,
        }, jwtSecret, { expiresIn: '48h' });

        res.cookie(projectName, token, {
            expires: new Date(Date.now() + (2 * 24 * 60 * 60 * 1000)),
            sameSite: 'None',
            secure: true 
        })

        res.status(200).json({      
            success: true,
            message: "Signed in successfully",
            data: loggedUser,
            token: `${projectName}=${token}; expires=${new Date(Date.now() + (2 * 24 * 60 * 60 * 1000))}; path=/`

        })

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}
    

// get userlist
export const getUser = async (req, res) => {
    try{
        const _id = req.query.id || null
        const user = await User.find(_id ? {_id}: {}).populate(['friendRequest', 'friends', 'post'])
        res.status(200).json({ data: user })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }

}   


// update user details
export const updateUser = async (req, res) => {
    try{
        const { username, email, phone, from, livesIn, hobbies, password, status } = req.body
        const { token } = req.query;
        const user = await User.findById(req.user.id).select('+password').populate(['friendRequest', 'friends', 'post'])

        if(!token){

            user.username = username || user.username;
            user.phone = phone || user.phone;
            user.from = from || user.from;
            user.livesIn = livesIn || user.livesIn;
            user.hobbies = hobbies || user.hobbies;   
            user.status = status || user.status
            if(req.file){

                const currentDate = Date.now()
                if(user.avatar != "avatar-user.svg"){
                    const storageRef = ref(getStorage(), `avatar/${user.avatar}`);
                    deleteObject(storageRef)
                }

                const image = await sharp(req.file.buffer)
                .resize(150, null) 
                .jpeg({ quality: 80 })
                .toBuffer()

                // const image = await Jimp.read(req.file.buffer);
                // image.resize(150, Jimp.AUTO)
                // .quality(80)
                // .writeAsync(`./uploads/avatar/avatar-${user._id}-${currentDate}.jpeg`);
                // const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
                
                const uint8Array = new Uint8Array(image);   
                const storageRef = ref(getStorage(), `avatar/avatar-${user._id}-${currentDate}.jpeg`); 
                await uploadBytes(storageRef, uint8Array, {contentType: 'image/jpeg',})

                user.avatar = `avatar-${user._id}-${currentDate}.jpeg`         
            }

            await user.save()
            return res.status(200).json({ data: user})
        }

    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Failed to update profile"
        })
    }
}


// sendOtp
export const sendOtp = async (req, res) => {
    try{
        const { email } = req.body
        const user = await User.findOne({email})
        const otp = Math.floor(1000 + Math.random() * 9000);
    
        if(user){
            const existingOtp = await Otp.findOne({ email })

            if(existingOtp){
                existingOtp.otp = otp
                existingOtp.save()
            }
            else{
                await Otp.create({ otp, email })
            }
      
            sendResetLinkMail(user.email, otp)
            res.status(200).json({
                success: true,
                message: "Otp sent to email",
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "User not found"
            })
        }
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }    
}


// change password
export const changePassword = async (req, res) => {
    try{
        const { email, otp, password } = req.body
        let usercredentials = await Otp.findOne({email})

        if(usercredentials && usercredentials.otp == otp){
            const user = await User.findOne({ email })
            const hashPass = await hash(password, 10);
            user.password = hashPass
            await usercredentials.deleteOne()
            user.save()
    
            res.status(200).json({
                success: true,
                message: "Password changed successfully"
            })
        }
        else{
            res.status(404).json({
                success: false,
                message: "otp does not match"
            })
        }
    }
    catch(err){
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }
}