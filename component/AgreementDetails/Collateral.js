import React, { useState, useEffect } from 'react';
import { Snackbar, useMediaQuery } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { Table } from 'antd';
import { collateralDetails } from '../../api';
import { numberWithCommas } from '../../utils';

const Collateral = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');
    const isWebDevice = useMediaQuery('(min-width: 980px)');

	const { agreementId } = useParams();

	// form hooks
	const [data, setData] = useState([]);

	useEffect(() => {
		setLoading(true);
		collateralDetails(agreementId)
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
			title: 'ID',
			dataIndex: 'coltrlId',
			align: 'center'
		},
		{
			title: 'Type',
			dataIndex: 'coltrlType',
			align: 'center'
		},
		{
			title: 'Value',
			dataIndex: 'coltrlValue',
			align: 'center',
            render: (value, row, key) => {
				const amount = numberWithCommas(row.coltrlValue);
				return <span>{amount}</span>;
			},
		},
		{
			title: 'Creation Date',
			dataIndex: 'dtCreation',
			align: 'center'
		},
		{
			title: 'Valuation Date',
			dataIndex: 'dtValuation',
			align: 'center'
		},
		{
			title: 'Handover',
			dataIndex: 'handoverYN',
			align: 'center'
		},
		{
			title: 'Insurance Request',
			dataIndex: 'insuranceReqYn',
			align: 'center'
		},
		{
			title: 'Release Note',
			dataIndex: 'releaseNote',
			align: 'center'
		},
		{
			title: 'Release Reason',
			dataIndex: 'releaseReason',
			align: 'center'
		},
		{
			title: 'Servicing Branch',
			dataIndex: 'servBranch',
			align: 'center'
		},
		{
			title: 'Status',
			dataIndex: 'status',
			align: 'center'
		},
		{
			title: 'Valuation Frequency',
			dataIndex: 'valuationFreq',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Collateral Details',
			dataIndex: 'master',
			align: 'center',
			render: (value, row, index) => {
				const coltrlId = row.coltrlId;
				const coltrlType = row.coltrlType;
				const coltrlValue = row.coltrlValue;
				const dtCreation = row.dtCreation;
				const dtValuation = row.dtValuation;
				const handoverYN = row.handoverYN;
				const insuranceReqYn = row.insuranceReqYn;
				const releaseNote = row.releaseNote;
				const releaseReason = row.releaseReason;
                const servBranch = row.servBranch;
                const status = row.status;
                const valuationFreq = row.valuationFreq;

				return (
					<div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Collateral ID</h5>
								<h5>{coltrlId}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Collateral Type</h5>
								<h5>{coltrlType}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Collateral Value</h5>
								<h5>{numberWithCommas(coltrlValue)}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Date of Creation</h5>
								<h5>{dtCreation}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Date of Valuation</h5>
								<h5>{dtValuation}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Handover</h5>
								<h5>{handoverYN}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Insurance Request</h5>
								<h5>{insuranceReqYn}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Release Note</h5>
								<h5>{releaseNote}</h5>
							</span>
						</div>
                        <div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Release Reason</h5>
								<h5>{releaseReason}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Servicing Branch</h5>
								<h5>{servBranch}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span className='mobile-left-align'>
								<h5 className='small-table-label'>Status</h5>
								<h5>{status}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Valuation Frequency</h5>
								<h5>{valuationFreq}</h5>
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
					rowKey='repaySchId'
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

export default Collateral;
