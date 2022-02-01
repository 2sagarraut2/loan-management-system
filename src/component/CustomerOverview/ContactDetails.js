import React, { useState, useEffect } from 'react';
import { Grid } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { customerContactDetails } from '../../api';
import Loader from '../Loader';

const ContactDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	// form hooks
	const [phoneNo, setPhoneNo] = useState('');
	const [alternatePhoneNo, setAlternatePhoneNo] = useState('');
	const [mobileNo, setMobileNo] = useState('');
	const [alternateMobileNo, SetAlternateMobileNo] = useState('');
	const [emailID, setEmailID] = useState('');
	const [faxNo, setFaxNo] = useState('');
	const [contactTimeFrom, setContactTimeFrom] = useState('');
	const [contactTimeTo, setContactTimeTo] = useState('');

	const { userId } = useParams();

	useEffect(() => {
		setLoading(true);
		customerContactDetails(userId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setPhoneNo(data.landline);
					setAlternatePhoneNo(data.alternateLandline);
					setMobileNo(data.mobile);
					SetAlternateMobileNo(data.alternateMobile);
					setEmailID(data.emailId);
					setFaxNo(data.fax);
					setContactTimeFrom(data.prefferedContactTimeFrom);
					setContactTimeTo(data.prefferedContactTimeTo);
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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Phone No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{phoneNo ? phoneNo : '-'}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Alternate Phone No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{alternatePhoneNo ? alternatePhoneNo : '-'}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Mobile No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{mobileNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Alternate Mobile No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{alternateMobileNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Email ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{emailID}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Fax No.</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{faxNo}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Preferred Contact Time</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{contactTimeFrom} to {contactTimeTo}
					</h4>
				</Grid>
				{/* <Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: "1%" }}>
                <h4>Customer Category</h4>
            </Grid>
            <Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: "1%" }}>
                <h4 className="customer-title">{""}</h4>
            </Grid> */}
			</Grid>
		</div>
	);
};

export default ContactDetails;
