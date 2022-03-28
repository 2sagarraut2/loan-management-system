import React, { useEffect, useState } from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/dashboard.scss';
import {
	List,
	ListItem,
	ListItemIcon,
	ListItemText,
	Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
import CreditCardRoundedIcon from '@material-ui/icons/CreditCardRounded';
import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import DateRangeRoundedIcon from '@material-ui/icons/DateRangeRounded';
import { useNavigate } from 'react-router-dom';
import { getBusinessDate } from '../api';

const Dashboard = () => {
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const menuItems = [
		{
			text: 'View All Customers',
			icon: <ListAltRoundedIcon />,
			path: '/view-customers'
		},
		{
			text: 'Customer Search',
			icon: <FindInPageRoundedIcon />,
			path: '/customer-search'
		},
		{
			text: 'EMI Presentation Batches',
			icon: <AddBoxRoundedIcon />,
			path: '/batch-control'
		},
		{
			text: 'Future Dues',
			icon: <AccessTimeRoundedIcon />,
			path: '/future-dues'
		},
		{
			text: 'EOD Status',
			icon: <BallotRoundedIcon />,
			path: '/eod-status'
		},
		{
			text: 'Cash Receipt',
			icon: <ReceiptRoundedIcon />,
			path: '/cash-receipt'
		},
		{
			text: 'Cheque Receipt',
			icon: <AccountBalanceRoundedIcon />,
			path: '/cheque-receipt'
		},
		{
			text: 'Online Payment Receipt',
			icon: <CreditCardRoundedIcon />,
			path: '/online-payment'
		},
		// {
		// 	text: 'Charges Booking',
		// 	icon: <AccountBalanceRoundedIcon />,
		// 	path: '/charges-booking'
		// },
		{
			text: 'Run EOD',
			icon: <DateRangeRoundedIcon />,
			path: '/run-eod'
		}
	];

	const history = useNavigate();

	const [businessDate, setBusinessDate] = useState('');

	useEffect(() => {
		getBusinessDate()
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setBusinessDate(data);
				}
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
			});
		// eslint-disable-next-line
	}, []);

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
			<Grid container spacing={3}>
				<Grid item xs={12} sm={4} md={3} lg={3}>
					<List>
						{menuItems.map((item) => (
							<Paper
								className='nav-button'
								onClick={() => history(item.path)}
								key={item.text}>
								<ListItem button key={item.text}>
									<ListItemIcon className='nav-icon'>{item.icon}</ListItemIcon>
									<ListItemText primary={item.text} className='nav-text' />
								</ListItem>
							</Paper>
						))}
					</List>
				</Grid>
				<Grid
					item
					xs={12}
					sm={8}
					md={9}
					lg={9}
					style={{ display: 'flex', justifyContent: 'flex-end' }}>
					<h3>Business Date: {businessDate}</h3>
				</Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
