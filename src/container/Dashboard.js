import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/dashboard.scss';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
import ListAltRoundedIcon from '@material-ui/icons/ListAltRounded';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import BallotRoundedIcon from '@material-ui/icons/BallotRounded';
import AccessTimeRoundedIcon from '@material-ui/icons/AccessTimeRounded';
// import ReceiptRoundedIcon from '@material-ui/icons/ReceiptRounded';
// import AccountBalanceRoundedIcon from '@material-ui/icons/AccountBalanceRounded';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
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
			text: 'Batch Control Center',
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
		// {
		// 	text: 'Direct Receipt',
		// 	icon: <ReceiptRoundedIcon />,
		// 	path: '/direct-receipt'
		// },
		// {
		// 	text: 'Charges Booking',
		// 	icon: <AccountBalanceRoundedIcon />,
		// 	path: '/charges-booking'
		// },
	];

	const history = useNavigate();

	return (
		<div>
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
									<ListItemText primary={item.text} className="nav-text" />
								</ListItem>
							</Paper>
						))}
					</List>
				</Grid>
				<Grid item xs={12} sm={8} md={9} lg={9}></Grid>
			</Grid>
		</div>
	);
};

export default Dashboard;
