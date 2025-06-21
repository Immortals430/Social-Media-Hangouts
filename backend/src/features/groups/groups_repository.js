import { Groups } from "./groups_schema.js";


export default class GroupsRepository {

  // create group
  async createGroup(userId, groupName) {
    const group = await Groups.create({
      admin: userId,
      name: groupName,
      members: [userId],
    });
    return group;
  }

  // add to group
  async addToGroup(groupId, userId) {
    await Groups.findByIdAndUpdate(
      { _id: groupId },
      { $inc: { totalMembers: 1 }, $push: { members: userId } }
    );
  }

  // remove from group
  async removeFromGroup(groupId, userId) {
    await Groups.findByIdAndUpdate(
      { _id: groupId },
      { $inc: { totalMembers: -1 }, $pull: { members: userId } }
    );
  }


  // find group
  async findGroup(groupId) {
    return await Groups.findById({ _id: groupId });
  }
}
