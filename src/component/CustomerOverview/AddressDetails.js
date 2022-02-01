import React, { useState, useEffect } from 'react';
import { Grid, FormControl, Select } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { customerAddress, customerAddressTypeList } from '../../api';
import Loader from '../Loader';

const AddressDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// form hooks
	const [addressType, setAddressType] = useState([]);
	const [selectedAddress, setSelectedAddress] = useState('');
	const [address1, setAddress1] = useState('');
	const [address2, setAddress2] = useState('');
	const [address3, setAddress3] = useState('');
	const [city, setCity] = useState('');
	const [state, setState] = useState('');
	const [postal, setPostal] = useState('');
	const [preferred, setPreffered] = useState('');

	const { userId } = useParams();

	useEffect(() => {
		// setLoading(true);
		customerAddressTypeList(userId)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					const { data } = res;
					setAddressType(data);
					setSelectedAddress(data[0].address);
					getCustomerAddress(userId, selectedAddress);
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
			getCustomerAddress(userId, selectedAddress);

		// eslint-disable-next-line
	}, [userId]);

	const getCustomerAddress = (customerId, addressType) => {
		// setLoading(true);
		customerAddress(customerId, addressType)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					// const { data } = res;
					setAddressType('Permanent');
					setAddress1('Chikhali');
					setAddress2('PCMC');
					setAddress3('Pune');
					setCity('Pune');
					setState('Maharashtra');
					setPostal('411019');
					setPreffered('Yes');
					getCustomerAddressDetails();
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
	};

	// useEffect(() => {
	// 	getCustomerAddressDetails();
	// }, [addressType])

	const getCustomerAddressDetails = (userId, addressType) => {
		setLoading(true);
		customerAddress(userId, addressType)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					// const { data } = res;
					setAddressType('Permanent');
					setAddress1('Chikhali');
					setAddress2('PCMC');
					setAddress3('Pune');
					setCity('Pune');
					setState('Maharashtra');
					setPostal('411019');
					setPreffered('Yes');
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
	};

	const handleOnSelectChange = (e) => {
		console.log(e.target.value);
	}

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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Address Type</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<FormControl style={{ margin: 7 }}>
						<Select native value={userId} onChange={handleOnSelectChange}>
							{addressType.map((item) => (
								<option key={item.loanId} value={item.loanId}>
									{item.loanId}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					{/* <h4>Middle Name</h4> */}
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					{/* <h4 className="customer-title">{""}</h4> */}
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Address Line 1</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{address1}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Address Line 2</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{address2}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Address Line 3</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{address3}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>City</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{city}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>State</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{state}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Postal Code</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{postal}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Preffered Address</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{preferred}</h4>
				</Grid>
			</Grid>
		</div>
	);
};

export default AddressDetails;
