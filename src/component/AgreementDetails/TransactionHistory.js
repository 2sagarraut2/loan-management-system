import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useMediaQuery, Grid, Snackbar } from '@material-ui/core';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementTransList } from '../../api';

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
			title: 'Tran. Date',
			dataIndex: 'dtTranDate',
			align: 'center'
		},
		{
			title: 'Tran. ID',
			dataIndex: 'tranId',
			align: 'center'
		},
		{
			title: 'Transaction Type',
			dataIndex: 'tranType',
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
			align: 'center'
		},
		{
			title: 'Credit Amount',
			dataIndex: 'creditAmount',
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
				const remark = row.remark;
				const debitAmount = row.debitAmount;
				const creditAmount = row.creditAmount;
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
								<h5 className='small-table-label'>Transaction Remark</h5>
								<h5>{remark}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Debit Amount</h5>
								<h5>{debitAmount}</h5>
							</span>
							<span className='mobile-right-align'>
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
			<Grid container style={{ padding: '1% 20px' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Principal Outstanding</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{prinOutstanding}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Due Balance Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{dueAmount}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Installment Dues</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{instlDue}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Charges Dues</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{chargesDue}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Excess Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{excessAmount}</h4>
				</Grid>
			</Grid>

			<div style={{ padding: '1% 20px' }}>
				<div className='table-wrapper'>
					<Table
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
