import React from 'react';
import { CircularProgress, Box } from '@material-ui/core';
import '../styles/loader.scss';

function Loader(props) {
	return (
		<Box className='loader-wrapper'>
			<CircularProgress className='loader' disableShrink />
		</Box>
	);
}

export default Loader;
