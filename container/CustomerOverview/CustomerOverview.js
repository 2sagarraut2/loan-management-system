import React from 'react';
import CustomerDetails from '../../component/CustomerOverview/CustomerDetails';
import CustomerCommon from '../../component/CustomerOverview/CustomerCommon';
import '../../styles/basicdetails.scss';

const CustomerOverview = () => {
	return (
		<div>
			<CustomerCommon>
				<CustomerDetails />
			</CustomerCommon>
		</div>
	);
};

export default CustomerOverview;
