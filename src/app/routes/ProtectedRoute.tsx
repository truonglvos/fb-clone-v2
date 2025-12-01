import { useAppSelector } from '@app/hooks';
import { selectIsAuthenticated } from '@features/auth';
import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
	const isAuthenticated = useAppSelector(selectIsAuthenticated);

	if (!isAuthenticated) {
		return <Navigate to="login" replace />;
	}

	return <Outlet />;
};
