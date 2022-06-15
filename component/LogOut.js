import { Button } from '@material-ui/core';
import React from 'react';
import { logout } from '../utils';
import { useNavigate } from "react-router-dom";

const LogOut = (props) => {
	const { size, text } = props;
    const navigate = useNavigate();

    const handleLogout = () => {
		logout();
        navigate('/');
	};

	return (
		<div>
			<Button
				className='back-button'
				variant='contained'
				color='primary'
				onClick={handleLogout}
				size={size}>
				{text}
			</Button>
		</div>
	);
};

export default LogOut;
