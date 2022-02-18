import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useMediaQuery, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementDueList } from '../../api';
import { numberWithCommas } from '../../utils';

const CurrentDue = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 705px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);
	const [total, setTotal] = useState(0);

	useEffect(() => {
		setLoading(true);
		agreementDueList(agreementId)
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

	useEffect(() => {
		let total = 0;

		data.map((item) => {
			return (total += item.dueAmount);
		});

		setTotal(numberWithCommas(total));

		// eslint-disable-next-line
	}, [data]);

	// columns for table
	const webCols = [
		{
			title: 'Loan ID',
			dataIndex: 'loanId',
			align: 'center'
		},
		{
			title: 'Installment',
			dataIndex: 'installmentNo',
			align: 'center'
		},
		{
			title: 'Due Category',
			dataIndex: 'dueCategory',
			align: 'center'
		},
		{
			title: 'Due Head',
			dataIndex: 'dueHead',
			align: 'center'
		},
		{
			title: 'Due Amount',
			dataIndex: 'dueAmount',
			render: (value, row, index) => {
				const amount = row.dueAmount;
				return <span>{numberWithCommas(amount)}</span>;
			},
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Current Due Details',
			align: 'center',
			render: (value, row, index) => {
				const id = row.loanId;
				const installmentNo = row.installmentNo;
				const category = row.dueCategory;
				const head = row.dueHead;
				const amount = row.dueAmount;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Loan ID</h5>
								<h5>{id}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Installment</h5>
								<h5>{installmentNo}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Due Category</h5>
								<h5>{category}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Due Head</h5>
								<h5>{head}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Due Amount</h5>
								<h5>{amount}</h5>
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
					rowKey='dueDtlId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 450 }}
					footer={() => (
						<div className='table-footer'>
							<h4 className='footer-label'>Total Dues</h4>
							<h4 className='footer-text'>{total}</h4>
						</div>
					)}
				/>
			</div>
		</div>
	);
};

export default CurrentDue;
