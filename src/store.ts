import { configureStore } from '@reduxjs/toolkit';
import authReducer from './features/auth/authSlice';
import boardListReducer from './features/boardList/boardSlice';
import boardReducer from './features/board/kanbanSlice';
import userListReducer from './features/userList/userListSlice';
import cardReducer from './features/cardEdit/cardSlice';


export const store = configureStore({
	reducer: {
		auth: authReducer,
		boardList: boardListReducer,
		board: boardReducer,
		userList: userListReducer,
		card: cardReducer,
	},
});


export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;
