import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import type { RootState } from '../../store';
import { AuthState, User } from './authTypes';
import { getUserFromLocalStorage } from '../../utils/authLocalStorage';
import { LoginFormState } from '../../components/login-form/LoginForm';
import { RegisterFormState } from '../../components/register-form/RegisterForm';
import authService from './authService';

export const registerUser = createAsyncThunk(
	'auth/register',
	async (registerCredentials: RegisterFormState, thunkApi) => {
		try {
			return await authService.register(registerCredentials);
		} catch (error: any) {
			let message = '';

			if (error.response.status === 401) {
				message = 'Username is already in use.';
			} else if (
				error.response.status === 500 ||
				error.response.status === 404
			) {
				message = 'Something went wrong.';
			}

			return thunkApi.rejectWithValue(message);
		}
	}
);

export const loginUser = createAsyncThunk(
	'auth/login',
	async (loginCredentials: LoginFormState, thunkApi) => {
		try {
			return await authService.login(loginCredentials);
		} catch (error: any) {
			let message = '';

			if (error.response.status === 400) {
				message = 'Invalid Credentials';
			} else if (
				error.response.status === 500 ||
				error.response.status === 404
			) {
				message = 'Something went wrong.';
			}

			return thunkApi.rejectWithValue(message);
		}
	}
);

const authenticatedUser = getUserFromLocalStorage();

const initialState: AuthState = {
	user: authenticatedUser || null,
	isLoading: false,
	isError: false,
	isSuccess: false,
	message: '',
};

export const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		clear: (state) => {
			state.isLoading = false;
			state.isError = false;
			state.isSuccess = false;
			state.message = '';
		},
	},
	extraReducers: (builder) => {
		builder.addCase(registerUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(registerUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.user = null;
			if (typeof action.payload === 'string') {
				state.message = action.payload;
			}
		});
		builder.addCase(registerUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			if (action.payload) {
				state.user = action.payload;
			}
		});

		builder.addCase(loginUser.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(loginUser.rejected, (state, action) => {
			state.isLoading = false;
			state.isError = true;
			state.user = null;
			if (typeof action.payload === 'string') {
				state.message = action.payload;
			}
		});
		builder.addCase(loginUser.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;
			if (action.payload) {
				state.user = action.payload;
			}
		});
	},
});

export const { clear } = authSlice.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectAuth = (state: RootState) => state.auth;

export default authSlice.reducer;
