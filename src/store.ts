import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import boardListReducer from './features/boardList/boardSlice';
import boardReducer from './features/board/kanbanSlice';
import userListReducer from './features/userList/userListSlice';
import cardReducer from './features/cardEdit/cardSlice';
// ...

export const store = configureStore({
	reducer: {
		auth: authReducer,
		boardList: boardListReducer,
		board: boardReducer,
		userList: userListReducer,
		card: cardReducer,
	},
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
