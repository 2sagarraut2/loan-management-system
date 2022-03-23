import React, { useState } from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';
import CustomTabPanel from './CustomTabPanel';
import BasicDetails from './BasicDetails';
import ContactDetails from './ContactDetails';
import AddressDetails from './AddressDetails';
import AgreementDetails from './AgreementDetails';

const useStyles = makeStyles(() => {
	return {
		indicator: {
			backgroundColor: '#8000f5'
		}
	};
});

const CustomerDetails = () => {
	const classes = useStyles();

	const [value, setValue] = useState(0);

	const handleTabChange = (event, value) => {
		setValue(value);
	};

	return (
		<div>
			<div className='tab-wrapper'>
				<Tabs
					orientation='vertical'
					variant="scrollable"
					value={value}
					onChange={handleTabChange}
					classes={{ indicator: classes.indicator }}
					className='tab-inner-wrapper'>
					<Tab label='Basic Information' />
					<Tab label='Contact Details' />
					<Tab label='Address Details' />
					<Tab label='Agreement Details' />
				</Tabs>
				<CustomTabPanel value={value} index={0}>
					<BasicDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<ContactDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					<AddressDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={3}>
					<AgreementDetails />
				</CustomTabPanel>
			</div>
		</div>
	);
};

export default CustomerDetails;
