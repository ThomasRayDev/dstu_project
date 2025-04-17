import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchUser, selectUser } from '../redux/slices/userSlice';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  React.useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch, window.location.pathname]);

  if (user.status == 'loading') {
    return <div>Загрузка</div>;
  }

  if (!user.user.user_id && user.status != 'loading') {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
