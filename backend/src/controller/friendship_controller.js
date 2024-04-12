import {User} from "../model/user_schema.js"

// send friend request
export const toggleReq = async (req, res) => {
    try{
        const { friendId } = req.body
        const friend = await User.findById(friendId).populate('friendRequest')
    
        const index = friend.friendRequest.findIndex(value => String(value._id) === req.user.id)
        if(index === -1) {
            friend.friendRequest.unshift(req.user.id)
            await friend.save()
        }
        else{
            friend.friendRequest.splice(index, 1)
            await friend.save()
        }
        res.status(200).json({
            success: true,
            message: "friend request sent",
            data: friend
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


// accept or reject friend request
export const respond = async (req, res) => {
    try{
        const { friendId, respond } = req.query
        const user = await User.findById(req.user.id).populate('friends')
        const friend = await User.findById(friendId).populate('friends')
        const frndIndex = user.friendRequest.findIndex(value => String(value._id) === friendId);

        if(respond === 'accept'){
            user.friends.unshift(friend)
            friend.friends.unshift(user)
            friend.save()
        }
        
        user.friendRequest.splice(frndIndex, 1);
        user.save()
  
        res.status(200).json({
            message: `friend request ${respond}ed`,
            data: {user, friend}
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

// unfriend
export const unfriend = async (req, res) => {
    try{
        const friend = await User.findById(req.params.id).populate('friends')
        const friendIndex = friend.friends.indexOf(req.user.id)
        friend.friends.splice(friendIndex, 1)
        friend.save()
        const user = await User.findById(req.user.id).populate('friends')
        const index = user.friends.indexOf(req.user.id)
        user.friends.splice(index, 1)
        user.save()
        res.status(200).json({
            message: `unfriend successfull`,
            data: {user, friend}
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