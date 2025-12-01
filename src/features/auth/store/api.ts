interface LoginPayload {
	email: string;
	password: string;
}

export async function loginApi(payload: LoginPayload) {
	// TODO: thay bằng fetch/axios thật
	// Ví dụ:
	// const res = await axios.post('/api/auth/login', payload);
	// return res.data;

	return new Promise<{ user: any; accessToken: string }>((resolve, reject) => {
		setTimeout(() => {
			if (
				payload.email === 'test@example.com' &&
				payload.password === '123456'
			) {
				resolve({
					user: {
						id: '1',
						email: payload.email,
						name: 'Test User',
					},
					accessToken: 'fake-jwt-token-123',
				});
			} else {
				reject(new Error('Email hoặc mật khẩu không đúng'));
			}
		}, 800);
	});
}
