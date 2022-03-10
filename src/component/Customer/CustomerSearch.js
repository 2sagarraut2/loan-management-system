import React, { useState } from 'react';
import {
	TextField,
	Button,
	Typography,
	Link,
	FormControl,
	Select
} from '@material-ui/core';
import BackButton from '../BackButton';
import { Search } from '@material-ui/icons';
import { Table } from 'antd';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const CustomerSearch = (props) => {
	const { data, searchForCustomer } = props;
	const [criterion, setCriterion] = useState('customer_id');
	const [values, setValues] = useState('');
	const isWebDevice = useMediaQuery('(min-width: 700px)');

	// common onchange handler
	const handleOnChange = (e) => {
		const name = e.target.name;
		const value = e.target.value;

		if (name === 'pan') {
			setValues(value.toUpperCase());
			return;
		}

		if (name === 'custid') {
			setValues(value.toUpperCase());
			return;
		}

		if (name === 'agreementid') {
			setValues(value.toUpperCase());
			return;
		}

		if (name === 'losapplicationno') {
			setValues(value.toUpperCase());
			return;
		}

		setValues(value);
	};

	// on click search
	const handleOnSearch = async () => {
		const params = {
			type: criterion,
			value: values
		};

		searchForCustomer(params);
	};

	// on click reset
	const handleOnReset = () => {
		setValues('');
		setCriterion('customer_id');
		// setData([]);
	};

	// search options array
	const searchOptions = [
		{
			key: 1,
			name: 'Customer ID',
			type: 'customer_id'
		},
		{
			key: 2,
			name: 'Master Agreement ID',
			type: 'master_agreement_id'
		},
		{
			key: 3,
			name: 'LOS Application No',
			type: 'los_application'
		},
		{
			key: 4,
			name: 'Mobile No.',
			type: 'mobile_no'
		},
		{
			key: 5,
			name: 'Pan No.',
			type: 'pan_no'
		}
	];

	// select values change
	const handleOnSelectChange = (e) => {
		setValues('');
		setCriterion(e.target.value);
	};

	// columns for table
	const webCols = [
		{
			title: 'Customer ID',
			dataIndex: 'customerId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.customerId;
				return (
					<span>
						<Link
							onClick={() => {
								window.location.href = `/customer-search/${id}`;
							}}>
							{id}
						</Link>
					</span>
				);
			}
		},
		{
			title: 'Customer Name',
			dataIndex: 'cust_name',
			align: 'center',
			render: (value, row, index) => {
				const title = row.title;
				const firstName = row.firstName;
				const lastName = row.lastName;
				return (
					<span>
						{title} {firstName} {lastName}
					</span>
				);
			}
		},
		{
			title: 'Mobile',
			dataIndex: 'mobile',
			align: 'center'
		},
		{
			title: 'Customer Category',
			dataIndex: 'custCategory',
			align: 'center'
		}
	];

	const deviceCols = [
		{
			title: 'Customer Details',
			dataIndex: 'customerId',
			align: 'left',
			render: (value, row, index) => {
				const id = row.customerId;
				const title = row.title;
				const firstName = row.firstName;
				const lastName = row.lastName;
				const mobile = row.mobile;
				const type = row.custCategory;

				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Customer ID</h5>
								<h5>
									<Link
										onClick={() => {
											window.location.href = `/customer-search/${id}`;
										}}>
										{id}
									</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Name</h5>
								<h5>
									{title} {firstName} {lastName}
								</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Mobile</h5>
								<h5>{mobile}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Customer Category</h5>
								<h5>{type}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Customer Search</Typography>
					<BackButton
						path='/dashboard'
						size={isWebDevice ? 'medium' : 'small'}
						text='Dashboard'
					/>
				</div>
				<div>
					<div
						style={{
							display: 'flex',
							flexDirection: 'row',
							marginTop: 10
						}}>
						<div>
							<FormControl style={{ margin: 7 }}>
								<Select
									native
									value={criterion}
									onChange={handleOnSelectChange}>
									{searchOptions.map((item) => (
										<option key={item.key} value={item.type}>
											{item.name}
										</option>
									))}
								</Select>
							</FormControl>
							{criterion === 'customer_id' && (
								<TextField
									className='cust-search-fields'
									size='small'
									label='Customer ID'
									variant='outlined'
									name='custid'
									value={values}
									onChange={handleOnChange}
									style={{ margin: 5 }}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (values) {
												handleOnSearch();
											}
										}
									}}
								/>
							)}
							{criterion === 'master_agreement_id' && (
								<TextField
									className='cust-search-fields'
									size='small'
									label='Master Agreement ID'
									variant='outlined'
									name='agreementid'
									value={values}
									onChange={handleOnChange}
									style={{ margin: 5 }}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (values) {
												handleOnSearch();
											}
										}
									}}
								/>
							)}

							{criterion === 'los_application' && (
								<TextField
									className='cust-search-fields'
									size='small'
									label='LOS Application No'
									variant='outlined'
									name='losapplicationno'
									value={values}
									onChange={handleOnChange}
									style={{ margin: 5 }}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (values) {
												handleOnSearch();
											}
										}
									}}
								/>
							)}

							{criterion === 'mobile_no' && (
								<TextField
									className='cust-search-fields'
									size='small'
									type='number'
									label='Mobile Number'
									variant='outlined'
									name='mobile'
									value={values}
									onChange={handleOnChange}
									onInput={(e) => {
										e.target.value = Math.max(0, parseInt(e.target.value))
											.toString()
											.slice(0, 10);
									}}
									style={{ margin: 5 }}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (values) {
												handleOnSearch();
											}
										}
									}}
								/>
							)}
							{criterion === 'pan_no' && (
								<TextField
									className='cust-search-fields'
									size='small'
									label='PAN No.'
									variant='outlined'
									name='pan'
									value={values}
									onChange={handleOnChange}
									inputProps={{ maxLength: 10 }}
									style={{ margin: 5 }}
									onKeyPress={(event) => {
										if (event.key === 'Enter') {
											if (values) {
												handleOnSearch();
											}
										}
									}}
								/>
							)}
							<span>
								<Button
									variant='contained'
									color='primary'
									className='search-buttons'
									onClick={handleOnSearch}
									disabled={!Boolean(values)}
									style={{ marginLeft: 5, marginTop: 7 }}
									startIcon={<Search />}>
									SEARCH
								</Button>
								<Button
									variant='contained'
									className='search-buttons'
									onClick={handleOnReset}
									disabled={!Boolean(values)}
									style={{ marginLeft: 5, marginTop: 7 }}>
									RESET
								</Button>
							</span>
						</div>
					</div>
				</div>
			</div>
			<div className='table-wrapper'>
				<Table
					rowKey='customerId'
					className='cust-table'
					dataSource={data}
					columns={isWebDevice ? webCols : deviceCols}
					pagination={false}
					scroll={{ y: 310 }}
				/>
			</div>
		</div>
	);
};

export default CustomerSearch;
