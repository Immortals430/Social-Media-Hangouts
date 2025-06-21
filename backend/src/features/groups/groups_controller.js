import GroupsRepository from "./groups_repository.js";
import { Groups } from "./groups_schema.js";

import { ApplicationError } from "../../middlewares/error_handler.js";

export default class GroupsController {
  constructor() {
    this.groupsRepository = new GroupsRepository();
  }

  // get groups
  async getGroups(req, res, next) {
    try {
      const page = 1;
      let limit = 10;
      let skip = (page - 1) * limit;

      const groups = await Groups.find({}, { }).skip(skip).limit(limit);
      return res.status(200).json(groups);
    } catch (err) {
      next(err);
    }
  }

  // create group
  async createGroup(req, res, next) {
    const userId = req.user.id
    const groupName = req.body.groupname;
    try {
      const group = await this.groupsRepository.createGroup(userId, groupName);
      return res.status(201).json(group);
    } catch (err) {
      next(err);
    }
  }
  
  // toggle add remove group
  async toggleAddRemoveFromGroup(req, res, next) {
    const groupId = req.params.groupId;
    const userId = req.user.id;
    try {
      const group = await this.groupsRepository.findGroup(groupId);

      if (group.admin == userId) {
        throw new ApplicationError("Cannot leave group as you are admin", 405);
      }

      const isMember = group.members.includes(userId)

      if (isMember) {
        
        this.groupsRepository.removeFromGroup(groupId, userId);
        return res.status(200).json({
          success: true,
          message: "Removed from group successfully",
        });
      } else {
        this.groupsRepository.addToGroup(groupId, userId);
        return res.status(200).json({
          success: true,
          message: "Added to group successfully",
        });
      }
    } catch (err) {
      next(err);
    }
  }
}
