import { httpClient } from "./httpClient";

export interface User {
  id: string
  name: string
  email: string
  avatar?: string
}

export interface LoginPayload {
  email: string
  password: string
}

export interface AuthResponse {
  token: string
  user: User
}

const authService = {
  login: async (payload: LoginPayload): Promise<AuthResponse> => {
    const response = await httpClient.post('/auth/login', payload)
    return response.data
  },

  register: async (payload: LoginPayload & { name: string }): Promise<AuthResponse> => {
    const response = await httpClient.post('/auth/register', payload)
    return response.data
  },

  logout: async (): Promise<void> => {
    await httpClient.post('/auth/logout')
  },

  getCurrentUser: async (): Promise<User> => {
    const response = await httpClient.get('/auth/me')
    return response.data
  },
}

export default authService
