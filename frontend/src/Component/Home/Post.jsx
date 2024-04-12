import "./Home.css"
import { RxCross1 } from "react-icons/rx";
import { FcLike } from "react-icons/fc";
import { CiHeart } from "react-icons/ci";
import { useDispatch, useSelector } from "react-redux";
import { createComment, deleteComment, deletePost, postSelector, toggleLike } from "../../redux/reducers/post_reducer";
import { userSelector } from "../../redux/reducers/user_reducer";
import { navigateSelector } from "../../redux/reducers/navigation_reducer";
import { MoonLoader } from "react-spinners";


    

export default function Post() {

    const { loggedUser } = useSelector(userSelector)
    const { posts } = useSelector(postSelector)
    const { loading } = useSelector(navigateSelector)
    const dispatch = useDispatch()
    const { userAvatar } = useSelector(userSelector)
    const { postImage } = useSelector(postSelector)


    // create comment
    function comment(e, postId){
        e.preventDefault()
        dispatch(createComment({content: e.target.content.value, postId}))
        e.target.content.value = ''
    }

    // delete post
    function remove(e, postId){
        e.preventDefault()
        dispatch(deletePost(postId))
    }


    return (
        <section className="middleSec">

            {loading.includes('posts') ? 
            <div className="flex v-center h-center post-loading">
                <h3>Loading posts</h3>   
                <MoonLoader color="var(--theme)"/>
            </div> :
            
            posts.map( (post, i ) => (

                <div className="postContainer" key={i}>
                    <div className="flex v-center userBox">                   
                        <div style={{backgroundImage: `url(${userAvatar[post.user._id]})`}} className="userDp"></div>
                        <h3 className="username">{post.user.username}</h3>
                        {post.user._id === loggedUser._id ? <RxCross1 onClick={(e) => remove(e, post._id)} className="pointer"/> : null}
                    </div>
        
                    <div>{post.caption}</div>
                    <div className="flex imgContainer">
                        <img src={`${postImage[post._id]}`} width="100%" alt={post.caption} />
                    </div>
        
                    <div className="flex v-center">
                        {post.like.includes(loggedUser._id) ?
                        <FcLike onClick={() => dispatch(toggleLike(post._id))} className="pointer" /> : 
                        <CiHeart onClick={() => dispatch(toggleLike(post._id))} className="pointer" />}
                        &nbsp;<span>{post.like.length}</span>
                    </div>
                    <br />
                    <hr />    
                    <form className="commentForm" onSubmit={(e) => comment(e, post._id)}>
                        <input type="text" name="content" placeholder="Write a comment" />
                        <input type="submit" />  
                    </form>
                    <div className="commentList">
                        {post.comment.map((comment, i) => (
                            <div key={i} className="flex" >
                                <div className="userDp commentDp" style={{backgroundImage: `url(${userAvatar[comment.user._id]})`}}></div>
                                <div className="stretch" >
                                    <div className="flex">
                                      
                                        <h5 className="stretch">{comment.user.username}</h5>
                                        {comment.user._id === loggedUser._id ?
                                        <RxCross1 onClick={() => dispatch(deleteComment(comment._id)) }/>
                                        : null}
                                    </div>
                                    <p className="commentPara">{comment.content}</p>
                                </div>

                                
                            </div>
                        ))}
                    </div>
                </div>
            ))}

        </section>
    )
}
