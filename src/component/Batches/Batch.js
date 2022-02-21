import React, { useState, useEffect } from 'react';
import {
	Button,
	Typography,
	FormControl,
	Link,
	Snackbar
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { makeStyles } from '@material-ui/core/styles';
import BackButton from '../BackButton';
import CloudUploadIcon from '@material-ui/icons/CloudUpload';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useParams } from 'react-router-dom';
import { batchDetails, downloadBatch, uploadBatch } from '../../api';
import { numberWithCommas } from '../../utils';

const useStyles = makeStyles((theme) => ({
	root: {
		'& > *': {
			margin: theme.spacing(1)
		}
	},
	input: {
		display: 'none'
	}
}));

const Batch = (props) => {
	const isWebDevice = useMediaQuery('(min-width: 700px)');
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { batchId } = useParams();

	const classes = useStyles();

	// form hooks
	const [data, setData] = useState([]);

	useEffect(() => {
		batchDetails(batchId)
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
				setData([]);
			});
	}, [batchId]);

	// columns for table
	const webCols = [
		{
			title: 'Master Agr. ID',
			dataIndex: 'mastAgrId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				return <span>{id}</span>;
			}
		},
		{
			title: 'Instrument Date',
			dataIndex: 'dtInstrumentDate',
			align: 'center',
			render: (value, row, index) => {
				const date = row.dtInstrumentDate;
				return <span>{date}</span>;
			}
		},
		{
			title: 'Instrument Type',
			dataIndex: 'instrumentType',
			align: 'center',
			render: (value, row, index) => {
				const date = row.instrumentType;
				return <span>{date}</span>;
			}
		},
		{
			title: 'Status',
			dataIndex: 'instrumentStatus',
			align: 'center'
		},
		{
			title: 'Bounce Reason',
			dataIndex: 'bounceReason',
			align: 'center'
		},
		{
			title: 'Instrument Amount',
			dataIndex: 'instrumentAmount',
			render: (value, row, key) => {
				const amount = numberWithCommas(row.instrumentAmount);
				return (
					<span>{amount}</span>
				)
			},
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Batch Details',
			dataIndex: 'mastAgrId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				const date = row.dtInstrumentDate;
				const type = row.instrumentType;
				const status = row.instrumentStatus;
				const reason = row.bounceReason;
				const amount = numberWithCommas(row.instrumentAmount);
				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Batch No.</h5>
								<h5>
									<Link>{id}</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Instrument Date</h5>
								<h5>{date}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Instrument Type</h5>
								<h5>{type}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Status</h5>
								<h5>{status}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Bounce Reason</h5>
								<h5>{reason}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Instrument Amount</h5>
								<h5>{amount}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	const handleOnDownload = () => {
		const dataIds = batchId;
		console.log(dataIds);

		const params = {
			arrBatchId: dataIds,
			businessDate: '2020-02-01'
		};
		// const url = '';
		// downloadFile(url);
		setLoading(true);

		downloadBatch(params)
			.then((res) => {
				if (res.status === 200) {
					const byteArray = res.data;

					var blob = new Blob([byteArray], { type: 'application/octet-stream' });
					var link = document.createElement('a');
					link.href = window.URL.createObjectURL(blob);
					link.download = 'download.zip';
					link.click();
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
	};

	// file upload function
	const onFileUploadChange = (e) => {
		const files = e.target.files;
		// console.warn(files[0].name);

		const reader = new FileReader();
		reader.readAsDataURL(files[0]);

		reader.onload = (e) => {
			const formData = { file: e.target.result };
			// console.log(formData);
			// send form data to api

			const params = {
				batchId: batchId,
				fileData: formData,
				fileName: files[0].name,
				businessDate: '2020-02-01'
			};

			uploadBatch(params)
				.then((res) => {
					if (res.status === 200) {
						const { data } = res;
						console.log(data);
						setSuccessMsg(data);
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
		};
	};

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
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Batch Details</Typography>
					<BackButton
						path='/batch-control'
						size={isWebDevice ? 'medium' : 'small'}
						text='Batch Details'
					/>
				</div>
				<Table
					rowKey='mastAgrId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 320 }}
				/>
				<div className='table-footer-batches'>
				<Button
						variant='contained'
						color='primary'
						className='search-buttons'
						onClick={handleOnDownload}
						style={{ marginLeft: 5 }}>
						Batch Downoad
					</Button>
					<FormControl>
						<input
							className={classes.input}
							id='contained-button-file'
							multiple
							type='file'
							accept='.csv'
							onChange={onFileUploadChange}
						/>
						<label htmlFor='contained-button-file'>
							<Button
								variant='contained'
								color='primary'
								component='span'
								startIcon={<CloudUploadIcon />}>
								Batch Upload
							</Button>
						</label>
					</FormControl>
				</div>
			</div>
		</div>
	);
};

export default Batch;
