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
import HistoryRoundedIcon from '@material-ui/icons/HistoryRounded';
import { useNavigate } from 'react-router-dom';
import { getBusinessDate } from '../api';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const Dashboard = () => {
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const isWebDevice = useMediaQuery('(min-width: 650px)');

	const menuItems = [
		{
			text: 'All Customers',
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

		// comment this code while production deployment ==> from here
		{
			text: 'Run EOD',
			icon: <DateRangeRoundedIcon />,
			path: '/run-eod'
		},
		// ==> to here

		// {
		// 	text: 'Charges Booking',
		// 	icon: <AccountBalanceRoundedIcon />,
		// 	path: '/charges-booking'
		// },
		{
			text: 'Limit History',
			icon: <HistoryRoundedIcon />,
			path: '/limit-history'
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
			<div>
				<Grid container spacing={3}>
					<Grid
						item
						xs={12}
						sm={12}
						md={12}
						lg={12}
						className='business-date-comp'>
						<h3>Business Date: </h3> <h3>{businessDate}</h3>
					</Grid>
					<Grid item xs={6} sm={12} md={12} lg={12} style={{ paddingTop: '0' }}>
						<List className='menu-button'>
							{menuItems.map((item) => (
								<Paper
									className='nav-button'
									onClick={() => history(item.path)}
									key={item.text}>
									<ListItem button key={item.text}>
										<ListItemIcon className='nav-icon'>
											{item.icon}
										</ListItemIcon>
										<ListItemText primary={item.text} className='nav-text' />
									</ListItem>
								</Paper>
							))}
						</List>
					</Grid>
					{/* {isWebDevice ? (
						<Grid
							item
							xs={12}
							sm={8}
							md={9}
							lg={9}
							style={{ display: 'flex', justifyContent: 'flex-end' }}>
							<h3>Business Date: </h3>
							<h3>{businessDate}</h3>
						</Grid>
					) : (
						''
					)} */}
				</Grid>
			</div>
		</div>
	);
};

export default Dashboard;
