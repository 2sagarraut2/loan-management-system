import React, { useState } from 'react';
import { Tabs, Tab, makeStyles } from '@material-ui/core';
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
import EPay from './EPay';
import Collateral from './Collateral';
import CustomerList from './CutomerList';

const useStyles = makeStyles(() => {
	return {
		indicator: {
			backgroundColor: '#8000f5',
			// padding: '1%'
		}
	};
});

const AgreementDetails = () => {
	const [value, setValue] = useState(0);
	const classes = useStyles();

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
					<Tab label='Agreement Overview' />
					<Tab label='Agreement Details' />
					<Tab label='List of Customers' />
					<Tab label='Product Parameters' />
					<Tab label='Fee Parameters' />
					<Tab label='Current Due Details' />
					<Tab label='Limit Details' />
					<Tab label='Repayment Schedule' />
					<Tab label='Transaction History' />
					<Tab label='Interest Accural History' />
					<Tab label='ENACH Setup' />
					<Tab label='Collateral Details' />
				</Tabs>
				<CustomTabPanel value={value} index={0}>
					<ActualAgreementOverview />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={1}>
					<ActualAgreementDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={2}>
					<CustomerList />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={3}>
					<ProductParameters />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={4}>
					<FeeParameters />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={5}>
					<CurrentDue />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={6}>
					<LimitDetails />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={7}>
					<RepaymentSchedule />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={8}>
					<TransactionHistory />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={9}>
					<InterestHistory />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={10}>
					<EPay />
				</CustomTabPanel>
				<CustomTabPanel value={value} index={11}>
					<Collateral />
				</CustomTabPanel>
			</div>
		</div>
	);
};

export default AgreementDetails;
