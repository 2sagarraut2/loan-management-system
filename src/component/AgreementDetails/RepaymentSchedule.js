import React, { useState, useEffect } from 'react';
import {
	useMediaQuery,
	Snackbar,
	Grid,
	FormControl,
	Select
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { Table } from 'antd';
import Loader from '../Loader';
import { agreementLoanList } from '../../api';
import { useParams } from 'react-router-dom';
import { agreementAmortList } from '../../api';

const RepaymentSchedule = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 980px)');

	const { agreementId } = useParams();

	// form hooks
	const [consolidated, setConsolidated] = useState('');
	const [loanID, setLoanID] = useState([]);
	const [selectedLoanID, setSelectedLoanID] = useState('');
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		agreementLoanList(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setLoanID(data);
					setSelectedLoanID(data[0].loanId);
					getAgreementAmortList();
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

	const getAgreementAmortList = () => {
		agreementAmortList(agreementId)
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
	};

	// columns for table
	const webCols = [
		{
			title: 'Opening',
			dataIndex: 'openingPrincipal',
			align: 'center'
		},
		{
			title: 'Inst#',
			dataIndex: 'installmentNo',
			align: 'center'
		},
		{
			title: 'Inst. Date',
			dataIndex: 'dtInstallment',
			align: 'center'
		},
		{
			title: 'Principal',
			dataIndex: 'principalAmount',
			align: 'center'
		},
		{
			title: 'Interest',
			dataIndex: 'interestRate',
			align: 'center'
		},
		{
			title: 'BPI',
			dataIndex: 'bpiAmount',
			align: 'center'
		},
		{
			title: 'Inst. Amt.',
			dataIndex: 'installmentAmount',
			align: 'center'
		},
		{
			title: 'Closing',
			dataIndex: 'closingPrincipal',
			align: 'center'
		},
		{
			title: 'Payment Dt.',
			dataIndex: 'payment_date',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Repayment Schedule',
			dataIndex: 'master',
			align: 'center',
			render: (value, row, index) => {
				const openingPrincipal = row.openingPrincipal;
				const installmentNo = row.installmentNo;
				const dtInstallment = row.dtInstallment;
				const principalAmount = row.principalAmount;
				const interestRate = row.interestRate;
				const bpiAmount = row.bpiAmount;
				const installmentAmount = row.installmentAmount;
				const closingPrincipal = row.closingPrincipal;
				const payment_date = row.payment_date;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Opening</h5>
								<h5>{openingPrincipal}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Inst#</h5>
								<h5>{installmentNo}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Inst. Date</h5>
								<h5>{dtInstallment}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Principal</h5>
								<h5>{principalAmount}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Interest</h5>
								<h5>{interestRate}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>BPI</h5>
								<h5>{bpiAmount}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Inst. Amt</h5>
								<h5>{installmentAmount}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Closing</h5>
								<h5>{closingPrincipal}</h5>
							</span>
						</div>
						<div className='last-label-center'>
							<span>
								<h5 className='small-table-label'>Payment Dt.</h5>
								<h5>{payment_date}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnSelectChange = (e) => {
		console.log(e.target.value);
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
			<Grid container style={{ alignItems: 'center' }}>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Consolidate</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{consolidated}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan ID</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<FormControl style={{ margin: 7 }}>
						<Select native value={agreementId} onChange={handleOnSelectChange}>
							{loanID.map((item) => (
								<option key={item.loanId} value={item.loanId}>
									{item.loanId}
								</option>
							))}
						</Select>
					</FormControl>
				</Grid>
			</Grid>
			<div className='table-wrapper'>
				<Table
					rowKey='installmentNo'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 430 }}
				/>
			</div>
		</div>
	);
};

export default RepaymentSchedule;
