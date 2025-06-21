import express from "express";
const groupRouter = express.Router();
import GroupsController from "./groups_controller.js";
const groupsController = new GroupsController();

groupRouter.get("/get-groups/:page", (req, res, next) => {
  groupsController.getGroups(req, res, next)
})

groupRouter.post("/create", (req, res, next) => {
  groupsController.createGroup(req, res, next)
});

groupRouter.post("/toggle/:groupId", (req, res, next) => {
  groupsController.toggleAddRemoveFromGroup(req, res, next)
});



export default groupRouter;
