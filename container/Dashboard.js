import React from 'react';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import '../styles/dashboard.scss';
import { List, ListItem, ListItemIcon, ListItemText } from '@material-ui/core';
import AddBoxRoundedIcon from '@material-ui/icons/AddBoxRounded';
// import ThumbUpIcon from '@material-ui/icons/ThumbUp';
import FindInPageRoundedIcon from '@material-ui/icons/FindInPageRounded';
import AccessTimeIcon from '@material-ui/icons/AccessTime';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
	const menuItems = [
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
		// {
		// 	text: 'My Approvals',
		// 	icon: <ThumbUpIcon />,
		// 	path: '/approvals'
		// },
		{
			text: 'Future Dues',
			icon: <AccessTimeIcon />,
			path: '/future-dues'
		},
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
