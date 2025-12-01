import type { PayloadAction } from '@reduxjs/toolkit';
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { storeService } from '@services/storageService';
import { ACCESS_TOKEN_KEY, USER_KEY } from '@shared/constants';
import type { HttpResponseError } from '@shared/types';
import type { RootState } from 'src/app/store';
import { loginApi } from './api';
import type { AuthState, User } from './types';

interface LoginPayload {
	email: string;
	password: string;
}

const accessTokenFromStorage = storeService.get(ACCESS_TOKEN_KEY);
const userFromStorage = storeService.get(USER_KEY);

const initialState: AuthState = {
	user: userFromStorage ? JSON.parse(userFromStorage) : null,
	accessToken: accessTokenFromStorage,
	status: 'idle',
	error: null,
};

export const login = createAsyncThunk<
	{ user: User; accessToken: string },
	LoginPayload,
	{ rejectValue: string }
>('auth/login', async (payload, thunkApi) => {
	try {
		const res = await loginApi(payload);
		return {
			user: res.user as User,
			accessToken: res.accessToken,
		};
	} catch (err: unknown) {
		return thunkApi.rejectWithValue(
			(err as HttpResponseError).message ?? 'Login failed',
		);
	}
});

const authSlice = createSlice({
	name: 'auth',
	initialState,
	reducers: {
		logout(state) {
			state.user = null;
			state.accessToken = null;
			state.status = 'idle';
			state.error = null;
			storeService.remove(ACCESS_TOKEN_KEY);
			storeService.remove(USER_KEY);
		},

		setUser(state, action: PayloadAction<User | null>) {
			state.user = action.payload;
			if (action.payload) {
				storeService.set(USER_KEY, JSON.stringify(action.payload));
			} else {
				storeService.remove(USER_KEY);
			}
		},
	},
	extraReducers: (builder) => {
		builder
			.addCase(login.pending, (state) => {
				state.status = 'loading';
				state.error = null;
			})
			.addCase(login.fulfilled, (state, action) => {
				state.status = 'succeeded';
				state.user = action.payload.user;
				state.accessToken = action.payload.accessToken;
				state.error = null;

				storeService.set(ACCESS_TOKEN_KEY, action.payload.accessToken);
				storeService.set(USER_KEY, JSON.stringify(action.payload.user));
			})
			.addCase(login.rejected, (state, action) => {
				state.status = 'failed';
				state.error = action.payload ?? 'Login failed';
			});
	},
});

export const { logout, setUser } = authSlice.actions;

export const selectAuthState = (state: RootState) => state.auth;
export const selectCurrentUser = (state: RootState) => state.auth.user;
export const selectIsAuthenticated = (state: RootState) =>
	Boolean(state.auth.accessToken);
export const selectAuthStatus = (state: RootState) => state.auth.status;
export const selectAuthError = (state: RootState) => state.auth.error;

export const authReducer = authSlice.reducer;
