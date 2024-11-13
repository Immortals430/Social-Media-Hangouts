import { ApplicationError } from "../../middlewares/error_handler.js";
import FriendshipRepository from "./friendship_repository.js";

export default class FriendshipController {
  constructor() {
    this.friendshipRepository = new FriendshipRepository();
  }

  async getFriendList(req, res, next) {
    try {
      const friends = await this.friendshipRepository.getFriends(req.user.id);
      res.status(200).json(friends);
    } catch (err) {
      next(err);
    }
  }

  async getFriendReq(req, res, next) {
    try {
      const frndReq = await this.friendshipRepository.getFriendReq(req.user.id);
      res.status(200).json(frndReq);
    } catch (err) {
      next(err);
    }
  }

  // async getSentReqStatus(req, res, next) {
  //   const { id } = req.params;
  //   try {
  //     const status = await this.friendshipRepository.getSentReqStatus(
  //       id,
  //       req.user.id
  //     );
  //     res.status(200).json(status);
  //   } catch (err) {
  //     next(err);
  //   }
  // }

  async toggleReq(req, res, next) {
    const { friendId } = req.params;
    try {
      if (friendId == req.user.id) {
        throw new ApplicationError("can't send req to yourself", 405);
      }
      const message = await this.friendshipRepository.toggleReq(
        friendId,
        req.user.id
      );
      res.status(200).json(message);
    } catch (err) {
      next(err);
    }
  }

  async respond(req, res, next) {
    const { friendId, respond } = req.query;
    try {
      if (friendId == req.user.id) {
        throw new ApplicationError("can't accept sent req", 405);
      }
      const response = await this.friendshipRepository.respond(
        friendId,
        respond,
        req.user.id
      );
      res.status(200).json(response);
    } catch (err) {
      next(err);
    }
  }

  async unfriend(req, res, next) {
    const { id } = req.params;
    try {
      await this.friendshipRepository.unfriend(id, req.user.id);

      res.status(200).json("unfriend successfull"
        // data: {user, friend}
      );
    } catch (err) {
      next(err);
    }
  }
}
