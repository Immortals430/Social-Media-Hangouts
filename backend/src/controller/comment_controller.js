import {Comment} from "../model/comment_schema.js"
import {Post} from "../model/post_schema.js"

export const createComment = async (req, res) => {
    try{
        const { content } = req.body
        const { postId } = req.params
        const post = await Post.findById(postId)
    
        if(post){
            const comment = await Comment.create({
                content,
                user: req.user.id,
                post: postId
            })
            post.comment.unshift(comment.id)
            await post.save()
            const updatedPost = await Post.findById(postId).populate('user').populate({ path: 'comment', populate: { path: 'user' }})
            return res.status(200).json({post: updatedPost})
        }

        return res.status(404).json({
            message: "Post not found"
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            message: "Something went wrong"
        })
    }
}


export const deleteComment = async (req, res) => {
    try{    
        const { commentId } = req.params
        const comment = await Comment.findById(commentId)
        const post = await Post.findById(comment.post).populate('user').populate({ path: 'comment', populate: { path: 'user' }}) 
        const index = post.comment.indexOf(commentId)
        post.comment.splice(index, 1)
        await post.save()
        await comment.deleteOne()

        res.status(200).json({
            success: true,
            data: post
        })
    }
    catch(err){
        console.log(err)
        res.status(500).json({
            success: false,
            message: "Something went wrong"
        })
    }


}