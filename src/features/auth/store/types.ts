import type { ApiStatus } from '@shared/types';

export interface User {
	id: string;
	email: string;
	name: string;
}

export interface AuthState {
	user: User | null;
	accessToken: string | null;
	status: ApiStatus;
	error: string | null;
}
