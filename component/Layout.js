import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import logo from '../images/4Fin_logo.png';
import '../styles/layout.scss';
import LogOut from './LogOut';
import { useMediaQuery } from '@material-ui/core';

const useStyles = makeStyles((theme) => {
	return {
		page: {
			width: '100%',
			padding: theme.spacing(2)
		},
		root: {
			display: 'flex'
		},
		toolbar: theme.mixins.toolbar,
		title: {
			color: '#302a6b'
		}
	};
});

// appbar code
const Layout = ({ children }) => {
	const classes = useStyles();

	const isWebDevice = useMediaQuery('(min-width: 700px)');
	const user = localStorage.getItem('loginData');

	return (
		<div className={classes.root}>
			{/* app bar */}
			<AppBar elevation={0}>
				<Toolbar className='nav-bar'>
					<div>
						<div style={{ display: 'flex', alignItems: 'center' }}>
							<img
								className='brand-logo'
								src={logo}
								alt='4FIN'
								onClick={() => {
									window.location.href = '/dashboard';
								}}
							/>
							{isWebDevice ? (
								<Typography
									noWrap={false}
									variant='h6'
									color='inherit'
									className={classes.title}>
									Loan Management System
								</Typography>
							) : (
								<div className={classes.title}>Loan Management System</div>
							)}
						</div>
					</div>
					<div className='user-logout-wrapper'>
						<span className='user-name'>{user}</span>
						<LogOut
							path='/'
							size={isWebDevice ? 'medium' : 'small'}
							text='Logout'
						/>
					</div>
				</Toolbar>
			</AppBar>
			{/* components are embeded here */}
			<div className={classes.page}>
				<div className={classes.toolbar}></div>
				{children}
			</div>
		</div>
	);
};

export default Layout;
