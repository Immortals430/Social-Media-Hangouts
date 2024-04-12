import 'dotenv/config'
import express from 'express'
import cors from 'cors'
import {userRouter} from './src/routes/user_routes.js'
import {postRouter} from './src/routes/post_route.js'
import {friendshipRouter} from './src/routes/friendship_route.js'
import {commentRouter} from './src/routes/comment_route.js'
import {likeRouter} from './src/routes/like_route.js'
import {connectDb} from './config/mongoose.js'
import cookieParser from 'cookie-parser'
import {jwtAuth} from './config/jwt_middleware.js'
import { chatRouter } from './src/routes/chat_route.js'
import "./config/firebase.js"
const port = process.env.PORT
const app = express()



app.use(cookieParser())
app.use(express.urlencoded({extended: true}))
app.use(express.json());
app.use(express.static('uploads'))
app.use(cors({
    origin: process.env.CLIENT,
    credentials: true,
}))


app.get('/', (req, res) => res.end('Bravo'))
app.use('/api/v1/user', userRouter)
app.use('/api/v1/post', jwtAuth, postRouter)
app.use('/api/v1/friendship',jwtAuth, friendshipRouter)
app.use('/api/v1/comment',jwtAuth, commentRouter)
app.use('/api/v1/like',jwtAuth, likeRouter)
app.use('/api/v1/chats', jwtAuth, chatRouter)


connectDb()
app.listen(port, (err) => {
    console.log(err || `Connected to Server at port: ${port}`)
})