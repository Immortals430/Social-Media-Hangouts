import { ApplicationError } from "../../middlewares/error_handler.js";
import { Friendship } from "./friendship_schema.js";

export default class FriendshipRepository {
  async getFriends(userId) {
    const friends = await Friendship.find({
      user: userId,
      status: "accepted",
    }).populate("friend");
    return friends;
  }

  async getFriendReq(userId) {
    const friends = await Friendship.find({
      friend: userId,
      status: "pending",
    }).populate("user");
    return friends;
  }

  async getSentReqStatus(id, userId) {
    const req = await Friendship.findOne({
      user: userId,
      friend: id,
      status: "pending",
    });
    if (req) return true;
    else return false;
  }

  async toggleReq(friendId, userId) {
    const friendship = await Friendship.findOne({
      user: userId,
      friend: friendId,
    });
    const req = await Friendship.findOne({
      user: friendId,
      friend: userId,
      status: "pending",
    });

    // if friend already sent req to user
    if (req) {
      throw new ApplicationError("friend already sent req to you", 405);
    }
    // if no req found
    if (!friendship) {
      await Friendship.create({
        user: userId,
        friend: friendId,
        status: "pending",
      });
      return "friend request sent";
    }
    // if user is already friend
    if (friendship.status == "accepted") {
      throw new ApplicationError("user is already a friend", 405);
    }
    // if user sent friend req to friend
    if (friendship.status == "pending") {
      await friendship.deleteOne();
      return "friend request revert";
    }
  }

  async respond(friendId, respond, userId) {
    const friendship = await Friendship.findOne({
      user: friendId,
      friend: userId,
      status: "pending",
    });
    if (!friendship) {
      throw new ApplicationError("friend req not found", 404);
    }

    if (respond == "accept") {
      friendship.status = "accepted";
      await friendship.save();
      const friend = await Friendship.create({
        user: userId,
        friend: friendId,
        status: "accepted",
      });
      await friend.populate("friend");
      return { friend, message: "request accepted" };
    } else {
      await friendship.deleteOne();
      return "request rejected";
    }
  }

  async unfriend(friendId, userId) {
    await Friendship.findOneAndDelete({ user: userId, friend: friendId });
    await Friendship.findOneAndDelete({ user: friendId, friend: userId });
  }
}
