import React from 'react';
import { Typography } from '@material-ui/core';
import BackButton from '../BackButton';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const AllCustomers = (props) => {
	const { data, total, pageNo, setPageNo } = props;
	const isWebDevice = useMediaQuery('(min-width: 700px)');

	const handleOnPageChange = (index) => {
		setPageNo(index);
	};

	// columns for table
	const webCols = [
		{
			title: 'Loan Agreement No.',
			dataIndex: 'mastAgrId',
			align: 'center'
		},
		{
			title: 'LOS LAN No.',
			dataIndex: 'originationApplnNo',
			align: 'center'
		},
		{
			title: 'Customer ID',
			dataIndex: 'customerId',
			align: 'center'
		},
		{
			title: 'Customer Name',
			dataIndex: 'customerName',
			align: 'center'
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
				const loanNo = row.mastAgrId;
				const losNo = row.originationApplnNo;
				const id = row.customerId;
				const customerName = row.customerName;
				const mobile = row.mobile;
				const category = row.custCategory;

				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Loan Agreement No.</h5>
								<h5>{loanNo}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>LOS LAN No.</h5>
								<h5>{losNo}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Customer ID</h5>
								{id}
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Name</h5>
								<h5>
									<h5>{customerName}</h5>
								</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Mobile No.</h5>
								{mobile}
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Category</h5>
								<h5>{category}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>View Customers</Typography>
					<BackButton
						path='/dashboard'
						size={isWebDevice ? 'medium' : 'small'}
						text='Dashboard'
					/>
				</div>
				<Table
					rowKey='custInternalId'
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
					scroll={{ y: 355 }}
				/>
			</div>
		</div>
	);
};

export default AllCustomers;
