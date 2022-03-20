export type User = {
	id: number;
	username: string;
	token: string;
};

export interface AuthState {
	user: User | null;
	isLoading: boolean;
	isError: boolean;
	isSuccess: boolean;
	message: string;
}
