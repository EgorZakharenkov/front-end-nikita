import { configureStore } from "@reduxjs/toolkit";
import { deviceReducer } from "./slices/DeviceSlice";
import { authReducer } from "./slices/user";
export const store = configureStore({
  reducer: {
    device: deviceReducer,
    user: authReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
