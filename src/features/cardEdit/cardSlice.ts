import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { Card } from '../board/kanbanSlice';

import type { RootState } from '../../store';
import cardService from './cardService';

type CardStateType = {
	card: Card;
	isLoading: boolean;
	isSuccess: boolean;
	updatePending: boolean;
};

const initialCardState: Card = {
	id: 0,
	title: '',
	duedate: null,
	description: null,
	order: null,
	listId: 0,
	labels: [],
	checklists: [],
	comments: [],
};

const initialState: CardStateType = {
	card: initialCardState,
	isLoading: false,
	isSuccess: false,
	updatePending: false,
};

export const getCard = createAsyncThunk(
	'card/getCard',
	async (cardId: string | number | undefined, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.getCard(cardId, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);
export const updateCardTitle = createAsyncThunk(
	'card/updateCardTitle',
	async (
		{ cardId, newTitle }: { cardId: number; newTitle: string },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.updateCardTitle(cardId, newTitle, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);
export const updateCardDescription = createAsyncThunk(
	'card/updateCardDescription',
	async (
		{
			cardId,
			newDescription,
		}: { cardId: number; newDescription: string | null },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.updateCardDescription(
				cardId,
				newDescription,
				token
			);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);

export const addCardComment = createAsyncThunk(
	'card/addCardComment',
	async (
		{ cardId, comment }: { cardId: number; comment: string },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.addCardComment(cardId, comment, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);
export const deleteCardComment = createAsyncThunk(
	'card/deleteCardComment',
	async (commentId: number, thunkApi) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.deleteCardComment(commentId, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);

export const addCardLabel = createAsyncThunk(
	'card/addCardLabel',
	async (
		{ cardId, labelId }: { cardId: number; labelId: number },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.addCardLabel(cardId, labelId, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);
export const removeCardLabel = createAsyncThunk(
	'card/removeCardLabel',
	async (
		{ cardLabelId, labelId }: { cardLabelId: number; labelId: number },
		thunkApi
	) => {
		const { auth } = thunkApi.getState() as RootState;
		const token = auth.user?.token;

		try {
			return await cardService.removeCardLabel(cardLabelId, labelId, token);
		} catch (error) {
			return thunkApi.rejectWithValue('There was an error...');
		}
	}
);

export const card = createSlice({
	name: 'card',
	initialState,
	reducers: {
		clearCard: (state) => {
			state.card = initialCardState;
			state.isLoading = false;

			state.isSuccess = false;
		},
	},
	extraReducers: (builder) => {
		builder.addCase(getCard.pending, (state) => {
			state.isLoading = true;
		});
		builder.addCase(getCard.fulfilled, (state, action) => {
			state.isLoading = false;
			state.isSuccess = true;

			if (action.payload !== null) {
				state.card = action.payload;
			}
		});
		builder.addCase(updateCardTitle.fulfilled, (state, action) => {
			if (action.payload) {
				state.card.title = action.payload;
			}
			state.updatePending = false;
		});
		builder.addCase(updateCardTitle.pending, (state, _) => {
			state.updatePending = true;
		});

		builder.addCase(updateCardDescription.fulfilled, (state, action) => {
			if (typeof action.payload === 'string') {
				state.card.description = action.payload;
			} else {
				state.card.description = null;
			}
		});
		builder.addCase(addCardComment.fulfilled, (state, action) => {
			if (action.payload) {
				state.card.comments.push(action.payload);
			}
		});
		builder.addCase(deleteCardComment.fulfilled, (state, action) => {
			state.card.comments = state.card.comments.filter(
				(c: any) => c.id !== action.payload
			);
		});
		builder.addCase(addCardLabel.fulfilled, (state, action) => {
			state.card.labels.push(action.payload);
		});
		builder.addCase(removeCardLabel.fulfilled, (state, action) => {
			const labelIndex = state.card.labels.findIndex(
				(l: any) => l.id === action.payload
			);

			if (typeof labelIndex === 'number' && labelIndex >= 0) {
				state.card.labels.splice(labelIndex, 1);
			}
		});
	},
});

export const { clearCard } = card.actions;

// Other code such as selectors can use the imported `RootState` type
export const selectCard = (state: RootState) => state.card;

export default card.reducer;
