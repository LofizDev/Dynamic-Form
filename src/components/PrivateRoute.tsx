import { Navigate, Outlet } from 'react-router-dom';

const useAuth = () => {
    const user = localStorage.getItem('isLoggedIn');
    return user ? true : false
};

const PrivateRoute = () => {
    const auth = useAuth();
    return auth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
