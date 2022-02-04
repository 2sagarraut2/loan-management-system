import React, { useState } from 'react';
import { login } from '../utils';
import '../styles/signin.scss';
import { FormControl, TextField, Button } from '@material-ui/core';
import logo from '../images/4Fin_logo.png';
import { useNavigate } from 'react-router-dom';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const SignIn = (props) => {
	const navigate = useNavigate();

	const [showPassword, setShowPassword] = useState(false);

	const handleLogin = () => {
		login();
		navigate('/dashboard');
	};

	const handleClickShowPassword = () => {
		// setValues({ ...values, showPassword: !values.showPassword });
		setShowPassword(!showPassword);
	};

	const handleMouseDownPassword = (event) => {
		event.preventDefault();
	};

	return (
		<div className='container-wrapper'>
			<div className='container center'>
				<div className='heading-wrapper'>
					<div className='head-wrapper'>
						<div>
							<img
								className='brand-logo'
								src={logo}
								alt='4FIN'
								onClick={() => {
									window.location.href = '/';
								}}
							/>
						</div>
						<h4>Loan Management System</h4>
					</div>
					<div>
						<h6>Version 1.0</h6>
					</div>
				</div>
				<div className='login-container'>
					<div className='login-wrapper'>
						<div>
							<h3>Login</h3>
							<FormControl>
								<TextField
									placeholder='Username'
									variant='outlined'
									size='small'
								/>
							</FormControl>
							<FormControl>
								<TextField
									placeholder='Password'
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
					<div style={{ width: '100%' }}>A</div>
				</div>
			</div>
			<div style={{ position: 'absolute', top: '76%', left: '38%' }}>
				<h4 style={{ color: '#fff', wordBreak: 'break-word' }}>Powered by: 4A Financial Technologies Pvt. Ltd.</h4>
			</div>
		</div>
	);
};

export default SignIn;
