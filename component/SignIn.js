import React, { useState } from 'react';
import { logout } from '../utils';
import '../styles/signin.scss';
import {
	// FormControl,
	// TextField,
	Button,
	// useMediaQuery,
	Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import logo from '../images/4Fin_logo.png';
import { useNavigate } from 'react-router-dom';
import GoogleLogin from 'react-google-login';
// import Visibility from '@material-ui/icons/Visibility';
// import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { CheckUser } from '../api';

const SignIn = (props) => {
	const navigate = useNavigate();
	// const isWebDevice = useMediaQuery('(min-width: 768px)');
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// const [showPassword, setShowPassword] = useState(false);
	const [loginData, setLoginData] = useState('');
	// const [userId, setUserId] = useState('');
	// const [password, setPassword] = useState('');

	// const handleLogin = () => {
	// 	login();
	// 	navigate('/dashboard');
	// };

	// const handleClickShowPassword = () => {
	// 	// setValues({ ...values, showPassword: !values.showPassword });
	// 	setShowPassword(!showPassword);
	// };

	const responseGoogle = (response) => {
		const requestParams = {
			userId: response.profileObj.email
		};

		CheckUser(requestParams)
			.then((res) => {
				if (res.status === 200 && res.data.data === true) {
					setLoginData(response.profileObj.name);
					localStorage.setItem('user', response.profileObj.name);
					navigate('/dashboard');
				} else {
					setErrorMsg(
						'You are not a authorised user! Please contact administrator'
					);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}, Please contact administrator`);
			});
	};

	const onFailureResponseGoogle = (response) => {
		console.log('google login failure response', response);
	};

	const handleLogout = () => {
		logout();
		localStorage.removeItem('loginData');
		setLoginData(null);
	};

	return (
		<div className='container-wrapper'>
			<Snackbar
				open={Boolean(successMsg)}
				autoHideDuration={3000}
				onClose={() => setSuccessMsg('')}>
				<Alert
					elevation={6}
					variant='filled'
					onClose={() => {
						setSuccessMsg('');
					}}
					severity='success'>
					{successMsg}
				</Alert>
			</Snackbar>
			<Snackbar
				open={Boolean(errorMsg)}
				autoHideDuration={3000}
				onClose={() => setErrorMsg('')}>
				<Alert
					elevation={6}
					variant='filled'
					onClose={() => {
						setErrorMsg('');
					}}
					severity='error'>
					{errorMsg}
				</Alert>
			</Snackbar>
			<div className='container center'>
				<div className='heading-wrapper'>
					<div className='head-wrapper'>
						<div>
							<img className='main-logo' src={logo} alt='4FIN' />
						</div>
						<h4>Loan Management System</h4>
					</div>
					<div className='version-div'>
						<h6>Version 1.0</h6>
					</div>
				</div>
				<div className='login-container'>
					{/* {isWebDevice ? null : <div style={{ width: '100%' }}>A</div>} */}
					<div className='login-wrapper'>
						<div className='login-inner-wrapper'>
							{/* <h3>Login</h3>
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
							</div> */}
							{loginData ? (
								<div>
									<h3>You logged in as {loginData.email}</h3>
									<Button
										onClick={handleLogout}
										variant='contained'
										color='primary'>
										Logout
									</Button>
								</div>
							) : (
								<div>
									<GoogleLogin
										clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
										onSuccess={responseGoogle}
										onFailure={onFailureResponseGoogle}
										cookiePolicy={'single_host_origin'}
									/>
								</div>
							)}
						</div>
					</div>
					{/* {isWebDevice ? <div style={{ width: '100%' }}>A</div> : null} */}
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
