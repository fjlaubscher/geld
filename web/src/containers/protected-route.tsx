import React from 'react';
import { Route, RouteProps } from 'react-router-dom';
import { useRecoilValue } from 'recoil';

// state
import authAtom from '../state/auth';

// components
import Login from './login';

const ProtectedRoute = ({ ...props }: RouteProps) => {
  const authed = useRecoilValue(authAtom);
  return authed ? <Route {...props} /> : <Login />;
};

export default ProtectedRoute;
