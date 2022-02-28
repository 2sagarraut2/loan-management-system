import React from 'react';
import { Button } from '@material-ui/core';
import '../styles/errorpage.scss';
import CachedIcon from '@material-ui/icons/Cached';
import HomeIcon from '@material-ui/icons/Home';

const ErrorPage = () => {
	return (
		<div className='error-container'>
			<h1>Something went wrong...</h1>
			<div className='button-wrapper'>
				<Button
					variant='contained'
					color='secondary'
					endIcon={<CachedIcon />}
					className='error-button'
					onClick={() => window.location.reload(false)}>
					Click here to reload
				</Button>
				<Button
					variant='contained'
					color='primary'
					startIcon={<HomeIcon />}
					className='error-button'
					onClick={() => (window.location.href = '/')}>
					Return Home
				</Button>
			</div>
			<h3>If problem still exist, Try again after sometime or contact administrator</h3>
		</div>
	);
};

export default ErrorPage;
