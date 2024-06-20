import { configureStore } from "@reduxjs/toolkit";
import { authReducer } from "./slices/user";
import { postReducer } from "./slices/post";
import { heroReducer } from "./slices/hero";
export const store = configureStore({
  reducer: {
    user: authReducer,
    posts: postReducer,
    hero: heroReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
