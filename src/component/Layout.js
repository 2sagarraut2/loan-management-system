import React from 'react';
import { makeStyles } from '@material-ui/core';
import { Typography, AppBar, Toolbar } from '@material-ui/core';
import logo from '../images/4Fin_logo.png';
import '../styles/layout.scss';

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
			color: '#302a6b',
		}
	};
});

// appbar code
const Layout = ({ children }) => {
	const classes = useStyles();

	return (
		<div className={classes.root}>
			{/* app bar */}
			<AppBar elevation={0}>
				<Toolbar className='nav-bar'>
					<img
						className='brand-logo'
						src={logo}
						alt='4FIN'
						onClick={() => {
							window.location.href = '/';
						}}
					/>
					<Typography variant='h6' color='inherit' className={classes.title}>
						Loan Management System
					</Typography>
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
