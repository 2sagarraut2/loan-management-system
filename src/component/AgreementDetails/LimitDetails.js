import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useMediaQuery, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementLimitList } from '../../api';

const LimitDetails = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 820px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		agreementLimitList(agreementId)
			.then((res) => {
				if (res.status === 200) {
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
				setData([]);
				setLoading(false);
			});

		// eslint-disable-next-line
	}, [agreementId]);

	// columns for table
	const webCols = [
		{
			title: 'Loan ID',
			dataIndex: 'loanId',
			align: 'center'
		},
		{
			title: 'Limit Sanction Date',
			dataIndex: 'dtLimitSanctioned',
			align: 'center'
		},
		{
			title: 'Sanction Amount',
			dataIndex: 'limitSanctionAmount',
			align: 'center'
		},
		{
			title: 'Utilized Amount',
			dataIndex: 'utilizedLimit',
			align: 'center'
		},
		{
			title: 'Drawing Power',
			dataIndex: 'drawingPower',
			align: 'center'
		},
		{
			title: 'Limit Expiry',
			dataIndex: 'dtLimitExpired',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Limit Details',
			align: 'center',
			render: (value, row, index) => {
				const id = row.loanId;
				const sanction_date = row.dtLimitSanctioned;
				const limitSanctionAmount = row.limitSanctionAmount;
				const utilizedLimit = row.utilizedLimit;
				const drawingPower = row.drawingPower;
				const dtLimitExpired = row.dtLimitExpired;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Loan ID</h5>
								<h5>{id}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Limit Sanction Date</h5>
								<h5>{sanction_date}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Sanction Amount</h5>
								<h5>{limitSanctionAmount}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Utilized Amount</h5>
								<h5>{utilizedLimit}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Drawing Power</h5>
								<h5>{drawingPower}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Limit Expiry</h5>
								<h5>{dtLimitExpired}</h5>
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
					rowKey='slimitId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 450 }}
				/>
			</div>
		</div>
	);
};

export default LimitDetails;
