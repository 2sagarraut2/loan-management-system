import React, { useState, useEffect } from 'react';
import { Snackbar, useMediaQuery } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { customerList } from '../../api';

const CustomerList = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 980px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);
	const [pageNo, setPageNo] = useState(1);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setLoading(true);

		const params = {
			agreementId: agreementId,
			pageNo: pageNo - 1,
			pageSize: 10
		};

		customerList(params)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setData(data.customerList);
					setTotal(data.totalRows);
				}
				setLoading(false);
			})
			.catch((error) => {
				const {
					response: {
						data: { errorResponseMessage }
					}
				} = error;
				setErrorMsg(`${errorResponseMessage}`);
				setLoading(false);
			});

		// eslint-disable-next-line
	}, [agreementId]);

	// columns for table
	const webCols = [
		{
			title: 'Customer ID',
			dataIndex: 'customerId',
			align: 'center'
		},
		{
			title: 'Customer Name',
			dataIndex: 'firstName',
			align: 'center',
			render: (value, row, key) => {
				const title = row.title;
				const firstName = row.firstName;
				const middleName = row.middleName;
				const lastName = row.lastName;

				return (
					<span>
						{title} {firstName} {middleName} {lastName}
					</span>
				);
			}
		},
		{
			title: 'Customer Type',
			dataIndex: 'customerType',
			align: 'center'
		},
		{
			title: 'Customer Category',
			dataIndex: 'custCategory',
			align: 'center'
		},
		{
			title: 'Customer Internal ID',
			dataIndex: 'custInternalId',
			align: 'center'
		},
		{
			title: 'Home Branch',
			dataIndex: 'homeBranch',
			align: 'center'
		},
		{
			title: 'Pan',
			dataIndex: 'pan',
			align: 'center'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Customer List',
			dataIndex: 'master',
			align: 'center',
			render: (value, row, index) => {
				const customerId = row.customerId;
				const title = row.title;
				const firstName = row.firstName;
				const middleName = row.middleName;
				const lastName = row.lastName;
				const customerType = row.customerType;
				const custCategory = row.custCategory;
				const custInternalId = row.custInternalId;
				const homeBranch = row.homeBranch;
				const pan = row.pan;
				const status = row.status;

				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Customer ID</h5>
								<h5>{customerId}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Name</h5>
								<h5>
									{title} {firstName} {middleName} {lastName}
								</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Customer Type</h5>
								<h5>{customerType}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Category</h5>
								<h5>{custCategory}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Customer Internal ID</h5>
								<h5>{custInternalId}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Home Branch</h5>
								<h5>{homeBranch}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Pan</h5>
								<h5>{pan}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Status</h5>
								<h5>{status}</h5>
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
		<div style={{ padding: '1% 20px' }}>
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
			{loading && <Loader />}
			<div className='table-wrapper'>
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
					scroll={{ y: 430 }}
				/>
			</div>
		</div>
	);
};

export default CustomerList;
