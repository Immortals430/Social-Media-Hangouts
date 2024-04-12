import {Post} from "../model/post_schema.js"
import {User} from "../model/user_schema.js"
import sharp from "sharp"
import {Comment} from "../model/comment_schema.js"
import { getStorage, ref, uploadBytes,deleteObject  } from "firebase/storage";



// get post
export const getPost = async (req, res) => {
    const post = (await Post.find({}).populate('user').populate({ path: 'comment', populate: { path: 'user' }})).reverse()
    res.status(200).json({data: post})
}


// add post
export const addPost = async (req, res) => {
    try{
        const { caption, date } = req.body
        const currentDate = Date.now()
        // compress photo
        console.log("compress start")
        const image = await sharp(req.file.buffer)
        .resize(550, null) 
        .jpeg({ quality: 100 })
        .toBuffer()

        // const image = await Jimp.read(req.file.buffer);
        // image.resize(550, Jimp.AUTO)
        // .quality(80)
        // upload photo

        const storageRef = ref(getStorage(), `post/image-${currentDate}.jpeg`);
        // const compressedImageBuffer = await image.getBufferAsync(Jimp.MIME_JPEG);
        const uint8Array = new Uint8Array(image);    
        await uploadBytes(storageRef, uint8Array, {contentType: 'image/jpeg',})
        // update db
        const post = await Post.create({
            caption,
            image: `image-${currentDate}.jpeg` || '',
            date,
            user: req.user.id
        })      
        const user = await User.findById(req.user.id)
        user.post.unshift(post.id)
        await user.save()
        // send response
        const postList = (await Post.find({}).populate(['user', 'comment'])).reverse()
        res.status(200).json({data: postList})   
    }
    catch(err){
        console.log(err)
        res.status(500).json({ message: "Something went wrong"})
    }
      
}


// delete post
export const deletePost = async (req, res) => {
    const { postId } = req.params
    const post = await Post.findById(postId)
    

    if(post && req.user.id === String(post.user)){
        try{
            
            if(post.image.length >= 1){
                const storageRef = ref(getStorage(), `post/${post.image}`);
                deleteObject(storageRef)
            }

            const user = await User.findById(post.user)
            
            const index = user.post.findIndex(obj => obj == post.id)
            user.post.splice(index, 1)
            user.save()
        
            post.comment.forEach(async id => await Comment.findByIdAndDelete(id))
            await Post.findByIdAndDelete(postId)
            const postList = (await Post.find({}).populate(['user', 'comment'])).reverse()        
            res.status(200).json({data: postList}) 

        }
        catch(err){
            console.log("err")
        }

    }


}