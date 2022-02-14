import React, { useState } from 'react';
import { login } from '../utils';
import '../styles/signin.scss';
import {
	FormControl,
	TextField,
	Button,
	useMediaQuery
} from '@material-ui/core';
import logo from '../images/4Fin_logo.png';
import { useNavigate } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const SignIn = (props) => {
	const navigate = useNavigate();
	const isWebDevice = useMediaQuery('(min-width: 768px)');

	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = () => {
		login();
		navigate('/dashboard');
	};

	const handleClickShowPassword = () => {
		// setValues({ ...values, showPassword: !values.showPassword });
		setShowPassword(!showPassword);
	};

	// const handleMouseDownPassword = (event) => {
	// 	event.preventDefault();
	// };

	return (
		<div className='container-wrapper'>
			<div className='container center'>
				<div className='heading-wrapper'>
					<div className='head-wrapper'>
						<div>
							<img
								className='main-logo'
								src={logo}
								alt='4FIN'
							/>
						</div>
						<h4>Loan Management System</h4>
					</div>
					<div className='version-div'>
						<h6>Version 1.0</h6>
					</div>
				</div>
				<div className='login-container'>
					{isWebDevice ? null : <div style={{ width: '100%' }}>A</div>}
					<div className='login-wrapper'>
						<div className='login-inner-wrapper'>
							<h3>Login</h3>
							<FormControl>
								<TextField
									placeholder='Username'
									fullWidth
									variant='outlined'
									size='small'
								/>
							</FormControl>
							<FormControl>
								<TextField
									placeholder='Password'
									fullWidth
									variant='outlined'
									size='small'
									type={showPassword ? 'text' : 'password'}
									InputProps={{
										endAdornment: (
											<span
												className='password-icon'
												onClick={handleClickShowPassword}>
												{showPassword ? <Visibility /> : <VisibilityOff />}
											</span>
										)
									}}
								/>
							</FormControl>
							<div className='action-wrapper'>
								<Button
									className='login-button'
									variant='contained'
									color='primary'
									onClick={() => handleLogin()}>
									Login
								</Button>
							</div>
						</div>
					</div>
					{isWebDevice ? <div style={{ width: '100%' }}>A</div> : null}
				</div>
			</div>
			{/* <div className='footer-wrapper'>
				<h4 style={{ color: '#fff', wordBreak: 'break-word' }}>
					Powered by: 4A Financial Technologies Pvt. Ltd.
				</h4>
			</div> */}
		</div>
	);
};

export default SignIn;
