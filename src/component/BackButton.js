import React from 'react';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import { Button } from '@material-ui/core';

const BackButton = (props) => {
    const { path, size, text } = props;

	return (
		<Button
			className='back-button'
			variant='contained'
			color='primary'
			onClick={() => {
				window.location.href = path;
			}}
            size={size}
			startIcon={<ArrowBackIosIcon />}>
			{text}
		</Button>
	);
};

export default BackButton;