import React from 'react';
import { Routes, Navigate, Outlet } from 'react-router-dom';
import { isLogin } from '../../utils';

const PublicRoute = ({ component: Component, restricted, ...rest }) => {
	console.log('Public', Component, restricted, rest);
	return isLogin() ? <Navigate to='/' /> : <Outlet />;
};

export default PublicRoute;
