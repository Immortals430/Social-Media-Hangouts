import "dotenv/config";
import express from "express";
import cors from "cors";
import userRouter from "./src/features/user/user_routes.js";
import postRouter from "./src/features/post/post_route.js";
import commentRouter from "./src/features/comment/comment_route.js";
import friendshipRouter from "./src/features/friendship/friendship_route.js";
import errorhandler from "./src/middlewares/error_handler.js";
import likeRouter from "./src/features/like/like_route.js";
import { connectDb } from "./src/config/mongoose.js";
import cookieParser from "cookie-parser";
import { jwtAuth } from "./src/middlewares/jwt_middleware.js";
import { chatRouter } from "./src/features/chat/chat_route.js";
import "./src/config/firebase.js";
import groupRouter from "./src/features/groups/groups_route.js";
const PORT = process.env.PORT || 8000;
const app = express();


app.use(cors({
  origin: process.env.CLIENT || "*",
  credentials: true,
  methods: 'GET,OPTIONS,PATCH,DELETE,POST,PUT',
  allowedHeaders: 'X-CSRF-Token, X-Requested-With, Accept, Content-Type, Authorization'
})); 

app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("uploads"));


app.use("/api/v1/user", userRouter);
app.use("/api/v1/post", jwtAuth, postRouter);
app.use("/api/v1/friendship", jwtAuth, friendshipRouter);
app.use("/api/v1/comment", jwtAuth, commentRouter);
app.use("/api/v1/like", jwtAuth, likeRouter);
app.use("/api/v1/chats", jwtAuth, chatRouter);
app.use("/api/v1/groups", jwtAuth, groupRouter);



app.use(errorhandler)
app.use((req, res) => res.send("wrong api"));

connectDb();
app.listen(PORT, (err) => {
  console.log(err || `Connected to Server`);
});
