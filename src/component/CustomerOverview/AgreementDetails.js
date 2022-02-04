import React, { useEffect, useState } from 'react';
import { Link } from '@material-ui/core';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useParams } from 'react-router-dom';
import { Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { customerAgreementList } from '../../api';

const AgreementDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 820px)');

	const { userId } = useParams();

	// form hooks
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		customerAgreementList(userId)
			.then((res) => {
				if (res.status === 200) {
					console.log(res);
					const { data } = res;
					setData(data);
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
		setData(dataSource);

		// eslint-disable-next-line
	}, [userId]);

	// datasource for table
	const dataSource = [
		{
			key: '1',
			mastAgrId: 1234,
			customerType: 'Borrower',
			portfolioCode: 'ML',
			totalTenor: '12/6',
			outstandingAmount: '79000',
			agreementStatus: 'Live'
		},
		{
			key: '2',
			mastAgrId: 1234,
			customerType: 'Borrower',
			portfolioCode: 'ML',
			totalTenor: '12/6',
			outstandingAmount: '79000',
			agreementStatus: 'Live'
		},
		{
			key: '3',
			mastAgrId: 1234,
			customerType: 'Borrower',
			portfolioCode: 'ML',
			totalTenor: '12/6',
			outstandingAmount: '79000',
			agreementStatus: 'Live'
		},
		{
			key: '4',
			mastAgrId: 1234,
			customerType: 'Borrower',
			portfolioCode: 'ML',
			totalTenor: '12/6',
			outstandingAmount: '79000',
			agreementStatus: 'Live'
		}
	];

	// columns for table
	const webCols = [
		{
			title: 'Master Agreement',
			dataIndex: 'mastAgrId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				return (
					<span>
						<Link
							onClick={() => {
								window.location.href = `/agreement-overview/${userId}/${id}`;
							}}>
							{id}
						</Link>
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
			title: 'Portfolio',
			dataIndex: 'portfolioCode',
			align: 'center'
		},
		{
			title: 'Total/Bal Tenor',
			dataIndex: 'totalTenor',
			align: 'center'
		},
		{
			title: 'OS Amount',
			dataIndex: 'outstandingAmount',
			align: 'center'
		},
		{
			title: 'agreementStatus',
			dataIndex: 'agreementStatus',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Master Agreement Details',
			dataIndex: 'mastAgrId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				const type = row.customerType;
				const portfolioCode = row.portfolioCode;
				const total = row.totalTenor;
				const amount = row.outstandingAmount;
				const agreementStatus = row.agreementStatus;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Master Agreement ID</h5>
								<h5>
									<Link
										onClick={() => {
											window.location.href = `/agreement-overview/${userId}/${id}`;
										}}>
										{id}
									</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Type</h5>
								<h5>{type}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Portfolio</h5>
								<h5>{portfolioCode}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Total/Bal Tenor</h5>
								<h5>{total}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>OS Amount</h5>
								<h5>{amount}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Status</h5>
								<h5>{agreementStatus}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

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
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 300 }}
				/>
			</div>
		</div>
	);
};

export default AgreementDetails;
