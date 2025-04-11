import { configureStore } from "@reduxjs/toolkit";
import {userReducer} from "./reducers/user_reducer";
import { postReducer } from "./reducers/post_reducer";

import { chatReducer } from "./reducers/chat_reducer";
import { friendsReducer } from "./reducers/friend_reducer";
import { commentsReducer } from "./reducers/comment_reducer";

const reducer = {
    userReducer,
    postReducer,

    chatReducer,
    friendsReducer,
    commentsReducer
}

export const store = configureStore({ reducer })

