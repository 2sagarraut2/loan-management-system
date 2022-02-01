import React, { useState, useEffect } from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import BackButton from '../BackButton';
import { useParams } from 'react-router-dom';
import { customerBasicDetails } from '../../api';

// common header component for all customer pages
const CustomerCommon = ({ children }) => {
	const { userId } = useParams();

	const isWebDevice = useMediaQuery('(min-width: 705px)');

	// from hooks
	const [sal, setSal] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		customerBasicDetails(userId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setSal(data.title);
					setFirstName(data.firstName);
					setMiddleName(data.middleName);
					setLastName(data.lastName);
					setStatus(data.status);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseCode, errorResponseMessage }
					}
				} = error;
				console.log(errorResponseCode, errorResponseMessage);
			});

		// eslint-disable-next-line
	}, [userId]);

	return (
		<div className='detail-header'>
			<div className='basic-title-wrapper'>
				{/* <div>
                    <Typography variant="h6" className="customer-basic-title">
                        Customer Basic Details
                    </Typography>
                </div> */}
				<div className='title-container'>
					<Typography variant='h6'>Customer Basic Details</Typography>
					{/* <Button
						className='back-button'
						variant='contained'
						color='primary'
						onClick={() => {
							window.location.href = '/customer-search';
						}}
						size={isWebDevice ? 'medium' : 'small'}>
						Back to Customer Search
					</Button> */}
					<BackButton
						path='/customer-search'
						size={isWebDevice ? 'medium' : 'small'}
						text='Customer Search'
					/>
				</div>
				<div className='customer-common-wrapper'>
					<h4 className='customer-common-label'>Customer ID</h4>
					<h4 className='customer-title customer-common-label'>{userId}</h4>
					<h4 className='customer-common-label'>Customer Name</h4>
					<h4 className='customer-title customer-common-label'>
						{sal} {firstName} {middleName} {lastName}
					</h4>
					<h4 className='customer-common-label'>Customer Status</h4>
					<h4 className='customer-title customer-common-label'>{status}</h4>
				</div>
			</div>
			{/* tabs will be rendered from here */}
			<div style={{ width: '100%' }}>{children}</div>
		</div>
	);
};

export default CustomerCommon;
