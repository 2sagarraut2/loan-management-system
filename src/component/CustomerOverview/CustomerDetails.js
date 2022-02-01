import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import CustomTabPanel from './CustomTabPanel';
import BasicDetails from './BasicDetails';
import ContactDetails from './ContactDetails';
import AddressDetails from './AddressDetails';
import AgreementDetails from './AgreementDetails';

const CustomerDetails = () => {
	// getting userid to call getApi
	// const { userId } = useParams();
	// console.log(userId);

	const [value, setValue] = useState(0);

	const handleTabChange = (event, value) => {
		setValue(value);
	};

	return (
		<div>
			<div className='tab-wrapper'>
				<Tabs
					orientation='vertical'
					value={value}
					onChange={handleTabChange}
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
