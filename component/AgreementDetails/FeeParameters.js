import React, { useState, useEffect } from 'react';
import { Table } from 'antd';
import { useMediaQuery, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { feeList } from '../../api';
import { numberWithCommas } from '../../utils';

const FeeParameters = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 980px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		feeList(agreementId)
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
			title: 'Fee Event',
			key: 'feeEent',
			dataIndex: 'feeEvent',
			align: 'center'
		},
		{
			title: 'Fee Head',
			key: 'feeCode',
			dataIndex: 'feeCode',
			align: 'center'
		},
		{
			title: 'Tenor',
			children: [
				{
					title: 'From',
					key: 'minTenor',
					dataIndex: 'minTenor',
					align: 'center'
				},
				{
					title: 'To',
					key: 'maxTenor',
					dataIndex: 'maxTenor',
					align: 'center'
				}
			]
		},
		{
			title: 'Fee Amount',
			children: [
				{
					title: 'From',
					key: 'minAmount',
					dataIndex: 'minAmount',
					render: (value, row, key) => {
						const amount = numberWithCommas(row.minAmount);
						return <span>{amount}</span>;
					},
					align: 'center'
				},
				{
					title: 'To',
					key: 'maxAmount',
					dataIndex: 'maxAmount',
					render: (value, row, key) => {
						const amount = numberWithCommas(row.maxAmount);
						return <span>{amount}</span>;
					},
					align: 'center'
				}
			]
		},
		{
			title: 'Fee Type',
			key: 'feeType',
			dataIndex: 'feeType',
			align: 'center'
		},
		{
			title: 'Amount',
			key: 'feeAmount',
			dataIndex: 'feeAmount',
			render: (value, row, key) => {
				const amount = row.feeAmount;
				return <div>{numberWithCommas(amount)}</div>;
			},
			align: 'center'
		},
		{
			title: 'Percentage',
			key: 'feePercentage',
			dataIndex: 'feePercentage',
			render: (value, row, key) => {
				const percentage = row.feePercentage;
				return <div>{numberWithCommas(percentage)}</div>;
			},
			align: 'center'
		},
		{
			title: 'Tax Applicable',
			key: 'taxApplicatbleYN',
			dataIndex: 'taxApplicatbleYN',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Fee Parameters',
			align: 'center',
			render: (value, row, index) => {
				const feeEvent = row.feeEvent;
				const feeCode = row.feeCode;
				const from_tenor = row.minTenor;
				const to_tenor = row.maxTenor;
				const minAmount = numberWithCommas(row.minAmount);
				const maxAmount = numberWithCommas(row.maxAmount);
				const feeType = row.feeType;
				const feeAmount = row.feeAmount;
				const percentage = row.feePercentage;
				const taxApplicatbleYN = row.taxApplicatbleYN;
				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Fee Event</h5>
								<h5>{feeEvent}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Fee Head</h5>
								<h5>{feeCode}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Tenor</h5>
								<h5>From {from_tenor}</h5>
								<h5>To {to_tenor}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Amount</h5>
								<h5>From {minAmount}</h5>
								<h5>To {maxAmount}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Fee Type</h5>
								<h5>{feeType}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Amount</h5>
								<h5>{numberWithCommas(feeAmount)}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Percentage</h5>
								<h5>{percentage}</h5>
							</span>
							<span>
								<h5 className='small-table-label'>Tax Applicable</h5>
								<h5>{taxApplicatbleYN}</h5>
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
					rowKey='feeParamId'
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

export default FeeParameters;
