import {Post} from "../model/post_schema.js";


export const toggle = async (req, res) => {
    try{
        const post = await Post.findById(req.params.postId).populate(['user', 'comment'])
        const index = post.like.findIndex(value => String(value) == req.user.id)
        if(post && index == -1) {
            post.like.push(req.user.id)
            await post.save()
            return res.status(200).json({
                message: "liked successfully",
                post
            })
        }
        if(post && index !== -1){
            post.like.splice(index, 1)
            await post.save()
            return res.status(200).json({
                message: "disliked successfully",
                post
            })
        }
        else res.status(404).json({message: "post not found"})
    }
    catch(err){
        console.log(err)
        res.status(500).json({ 
            message: "Something went wrong",
        })  
    }
}