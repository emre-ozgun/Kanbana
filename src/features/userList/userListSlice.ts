import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import userListService from './userListService';

export const getUsers = createAsyncThunk(
	'userList/getUsers',
	async (_, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await userListService.getUsers(token);
		} catch (error) {
			return thunkApi.rejectWithValue(
				'There was an error. Please try refreshing the page...'
			);
		}
	}
);

const initialState = {
	userList: [],
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

export const userList = createSlice({
	name: 'userList',
	initialState,
	reducers: {
		clear: (state) => {
			state.userList = [];
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getUsers.pending, (state) => {
			state.isLoading = true;
		});

		builder.addCase(getUsers.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			if (action.payload) {
				state.userList = action.payload;
			}
		});
	},
});

export const { clear } = userList.actions;

export const selectUsers = (state: RootState) => state.userList;

export default userList.reducer;
