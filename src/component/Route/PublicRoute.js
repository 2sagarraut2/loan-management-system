import React from 'react';
import { Route, Outlet, Navigate } from 'react-router-dom';
import { isLogin } from '../../utils';

const PublicRoute = ({ element: Component, redirect: pathname }) => {
	return (
		<Route
			render={() =>
				isLogin ? <Navigate to={{ pathname: pathname }} /> : <Component />
			}
		/>
	);
};

export default PublicRoute;
