import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useMediaQuery, Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementTransHeader, agreementTransList } from '../../api';
import { numberWithCommas } from '../../utils';

const TransactionHistory = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 820px)');

	const { agreementId } = useParams();

	// form hooks
	const [prinOutstanding, setprinOutstanding] = useState('');
	const [dueAmount, setDueAmount] = useState('');
	const [instlDue, setInstlDue] = useState('');
	const [chargesDue, setChargesDue] = useState('');
	const [excessAmount, setExcessAmount] = useState('');
	const [data, setData] = useState('');

	useEffect(() => {
		setLoading(true);
		agreementTransList(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setData(data);
					setprinOutstanding('');
					setDueAmount('');
					setInstlDue('');
					setChargesDue('');
					setExcessAmount('');
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
		setLoading(true);
		agreementTransHeader(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setprinOutstanding(data.principalOutstanding);
					setDueAmount(data.dueBalance);
					setInstlDue(data.installmentDue);
					setChargesDue(data.chargesDue);
					setExcessAmount(data.excessAmount);
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
			title: 'Transaction Date',
			dataIndex: 'dtTranDate',
			align: 'center'
		},
		{
			title: 'Transaction ID',
			dataIndex: 'tranId',
			align: 'center'
		},
		{
			title: 'Transaction Type',
			dataIndex: 'tranType',
			align: 'center'
		},
		{
			title: 'Transaction Category',
			dataIndex: 'tranCategory',
			align: 'center'
		},
		{
			title: 'Transaction Remark',
			dataIndex: 'remark',
			align: 'center'
		},
		{
			title: 'Debit Amount',
			dataIndex: 'debitAmount',
			render: (value, row, key) => {
				const amount = numberWithCommas(row.debitAmount);
				return <span>{amount}</span>;
			},
			align: 'center'
		},
		{
			title: 'Credit Amount',
			dataIndex: 'creditAmount',
			render: (value, row, key) => {
				const amount = numberWithCommas(row.creditAmount);
				return <span>{amount}</span>
			},
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Transaction History',
			align: 'center',
			render: (value, row, index) => {
				const dtTranDate = row.dtTranDate;
				const tranId = row.tranId;
				const tranType = row.tranType;
				const tranCategory = row.tranCategory;
				const remark = row.remark;
				const debitAmount = numberWithCommas(row.debitAmount);
				const creditAmount = numberWithCommas(row.creditAmount);
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Tran Date</h5>
								<h5>{dtTranDate}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Tran ID</h5>
								<h5>{tranId}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Transaction Type</h5>
								<h5>{tranType}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Transaction Category</h5>
								<h5>{tranCategory}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Transaction Remark</h5>
								<h5>{remark}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Debit Amount</h5>
								<h5>{debitAmount}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Credit Amount</h5>
								<h5>{creditAmount}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	return (
		<div>
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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Principal Outstanding</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{numberWithCommas(prinOutstanding)}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Due Balance Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(dueAmount)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Installment Dues</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(instlDue)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Charges Dues</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(chargesDue)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Excess Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(excessAmount)}</h4>
				</Grid>
			</Grid>

			<div style={{ padding: '1% 20px' }}>
				<div className='table-wrapper'>
					<Table
						rowKey='tranId'
						className='cust-table'
						dataSource={data}
						columns={isWebDevice ? webCols : deviceCols}
						pagination={false}
						scroll={{ y: 190 }}
					/>
				</div>
			</div>
		</div>
	);
};

export default TransactionHistory;
