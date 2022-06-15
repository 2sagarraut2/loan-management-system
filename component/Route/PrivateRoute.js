import React from 'react';
import { Outlet, Navigate } from 'react-router-dom';
import { isLogin } from '../../utils';
import Layout from '../Layout';

const PrivateRoute = ({ children, ...rest }) => {
	return isLogin() ? (
		<Layout>
			<Outlet />
		</Layout>
	) : (
		<Navigate to='/' />
	);
};

export default PrivateRoute;
