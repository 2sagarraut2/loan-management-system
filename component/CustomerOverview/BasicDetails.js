import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { customerBasicDetails } from '../../api';
import Loader from '../Loader';

const BasicDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// form hooks
	// const [sal, setSal] = useState('');
	const [firstName, setFirstName] = useState('');
	const [middleName, setMiddleName] = useState('');
	const [lastName, setLastName] = useState('');
	const [gender, setGender] = useState('');
	const [residence, setResidence] = useState('');
	const [pan, setPan] = useState('');
	const [branch, setBranch] = useState('');
	const [category, setCategory] = useState('');

	const { userId } = useParams();

	useEffect(() => {
		setLoading(true);
		customerBasicDetails(userId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					// setSal(data.title);
					setFirstName(data.firstName);
					setMiddleName(data.middleName);
					setLastName(data.lastName);
					setGender(data.gender);
					setResidence(data.residenceStatus);
					setPan(data.pan);
					setBranch(data.homeBranch);
					setCategory(data.custCategory);
				}
				setLoading(false);
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
				setLoading(false);
			});

		// eslint-disable-next-line
	}, [userId]);

	return (
		<div>
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
			{loading && <Loader />}
			<Grid container style={{ padding: '1% 25px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>First Name</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{firstName}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Middle Name</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{middleName}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Last Name</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{lastName}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Gender</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{gender}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Residence Status</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{residence}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>PAN No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{pan}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Home Branch</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{branch}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Customer Category</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{category}</h4>
				</Grid>
			</Grid>
		</div>
	);
};

export default BasicDetails;
