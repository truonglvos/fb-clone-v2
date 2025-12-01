import axios, { type AxiosInstance } from 'axios';
import { getAccessToken } from './storageService';

const API_BASE_URL =
	import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api';

const httpClient: AxiosInstance = axios.create({
	baseURL: API_BASE_URL,
	timeout: 10000,
	headers: {
		'Content-Type': 'application/json',
	},
});

httpClient.interceptors.request.use(
	(config) => {
		const token = getAccessToken();
		if (token) {
			config.headers.Authorization = `Bearer ${token}`;
		}
		return config;
	},
	(error) => {
		return Promise.reject(error);
	},
);

httpClient.interceptors.response.use(
	(response) => response,
	(error) => {
		if (error.response?.status === 401) {
			localStorage.removeItem('authToken');
			window.location.href = '/login';
		}
		return Promise.reject(error);
	},
);

export { httpClient };
