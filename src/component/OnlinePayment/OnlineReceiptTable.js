import React from 'react';
import {
	Link
} from '@material-ui/core';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const OnlineReceiptTable = (props) => {
	const {
		data,
		pageNo,
		setPageNo,
		total,
	} = props;
	// const [criterion, setCriterion] = useState('customer_id');
	// const [values, setValues] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 700px)');

	// common onchange handler
	// const handleOnChange = (e) => {
	// 	const name = e.target.name;
	// 	const value = e.target.value;

	// 	if (name === 'pan') {
	// 		setValues(value.toUpperCase());
	// 		return;
	// 	}

	// 	if (name === 'custid') {
	// 		setValues(value.toUpperCase());
	// 		return;
	// 	}

	// 	if (name === 'agreementid') {
	// 		setValues(value.toUpperCase());
	// 		return;
	// 	}

	// 	if (name === 'losapplicationno') {
	// 		setValues(value.toUpperCase());
	// 		return;
	// 	}

	// 	setValues(value);
	// };

	// on click search
	// const handleOnSearch = async () => {
	// 	const params = {
	// 		type: criterion,
	// 		value: values
	// 	};

	// 	searchForCustomer(params);
	// };

	// on click reset
	// const handleOnReset = () => {
	// 	setValues('');
	// 	setCriterion('customer_id');
	// 	// setData([]);
	// 	getAllCustomers();
	// };

	// search options array
	// const searchOptions = [
	// 	{
	// 		key: 1,
	// 		name: 'Customer ID',
	// 		type: 'customer_id'
	// 	},
	// 	{
	// 		key: 2,
	// 		name: 'Master Agreement ID',
	// 		type: 'master_agreement_id'
	// 	},
	// 	{
	// 		key: 3,
	// 		name: 'LOS Application No',
	// 		type: 'los_application'
	// 	},
	// 	{
	// 		key: 4,
	// 		name: 'Mobile No.',
	// 		type: 'mobile_no'
	// 	},
	// 	{
	// 		key: 5,
	// 		name: 'Pan No.',
	// 		type: 'pan_no'
	// 	}
	// ];

	// select values change
	// const handleOnSelectChange = (e) => {
	// 	setValues('');
	// 	setCriterion(e.target.value);
	// };

	// columns for table
	const webCols = [
		{
			title: 'Customer ID',
			dataIndex: 'customerId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.customerId;
				const mid = row.mastAgrId;
				return (
					<span>
						<Link
							onClick={() => {
								window.location.href = `/online-payment/${id}/${mid}`;
							}}>
							{id}
						</Link>
					</span>
				);
			}
		},
		{
			title: 'Customer Name',
			dataIndex: 'cust_name',
			align: 'center',
			render: (value, row, index) => {
				const title = row.title;
				const firstName = row.firstName;
				const lastName = row.lastName;
				return (
					<span>
						{title} {firstName} {lastName}
					</span>
				);
			}
		},
		{
			title: 'Mobile',
			dataIndex: 'mobile',
			align: 'center'
		},
		{
			title: 'Customer Category',
			dataIndex: 'custCategory',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Customer Details',
			dataIndex: 'customerId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.customerId;
				const mid = row.mastAgrId;
				const title = row.title;
				const firstName = row.firstName;
				const lastName = row.lastName;
				const mobile = row.mobile;
				const type = row.custCategory;

				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Customer ID</h5>
								<h5>
									<Link
										onClick={() => {
											window.location.href = `/online-payment/${id}/${mid}`;
										}}>
										{id}
									</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Name</h5>
								<h5>
									{title} {firstName} {lastName}
								</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Mobile</h5>
								<h5>{mobile}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Category</h5>
								<h5>{type}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnPageChange = (index) => {
		setPageNo(index);
	};

	return (
		<div>
			<div className='table-wrapper'>
				<Table
					rowKey='customerId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={{
						size: 'small',
						showSizeChanger: false,
						total: total,
						current: pageNo,
						onChange: handleOnPageChange,
						defaultPageSize: 10
					}}
					scroll={{ y: 310 }}
				/>
			</div>
		</div>
	);
};

export default OnlineReceiptTable;
