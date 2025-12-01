export type ApiStatus = 'idle' | 'loading' | 'succeeded' | 'failed';

export interface HttpResponseError {
	message: string;
}
