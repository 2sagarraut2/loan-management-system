import React, { useState } from 'react';
import { Tabs, Tab } from '@material-ui/core';
import CustomTabPanel from '../CustomerOverview/CustomTabPanel';
import ActualAgreementOverview from './ActualAgreementOverview';
import ActualAgreementDetails from './ActualAgreementDetails';
import ProductParameters from './ProductParameters';
import FeeParameters from './FeeParameters';
import CurrentDue from './CurrentDue';
import LimitDetails from './LimitDetails';
import RepaymentSchedule from './RepaymentSchedule';
import TransactionHistory from './TransactionHistory';
import InterestHistory from './InterestHistory';

const AgreementDetails = () => {
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
					<Tab label='Agreement Overview' />
					<Tab label='Agreement Details' />
					<Tab label='Product Parameters' />
					<Tab label='Fee Parameters' />
					<Tab label='Current Due Details' />
					<Tab label='Limit Details' />
					<Tab label='Repayment Schedule' />
					<Tab label='Transaction History' />
					<Tab label='Interest Accural History' />
				</Tabs>
				<CustomTabPanel value={value} index={0}>
					<ActualAgreementOverview />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<ActualAgreementDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					<ProductParameters />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={3}>
					<FeeParameters />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={4}>
					<CurrentDue />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={5}>
					<LimitDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={6}>
					<RepaymentSchedule />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={7}>
					<TransactionHistory />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={8}>
					<InterestHistory />
				</CustomTabPanel>
			</div>
		</div>
	);
};

export default AgreementDetails;
