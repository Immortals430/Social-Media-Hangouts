import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user_reducer";
import { postReducer } from "./reducers/post_reducer";
import { navigateReducer } from "./reducers/navigation_reducer";
import { chatReducer } from "./reducers/chat_reducer";
import { friendsReducer } from "./reducers/friend_reducer";
import { commentsReducer } from "./reducers/comment_reducer";


export const store = configureStore({
    reducer: {
        userReducer,
        postReducer,
        navigateReducer,
        chatReducer,
        friendsReducer,
        commentsReducer
    }
})