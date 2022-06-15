import React, { useState } from 'react';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { Link } from '@material-ui/core';
import { numberWithCommas } from '../../utils';
import { Table } from 'antd';

const ApportionTable = (props) => {
	const isWebDevice = useMediaQuery('(min-width: 650px)');
	const [data, setData] = useState([]);

	// columns for table
	const webCols = [
		{
			title: 'Loan ID',
			dataIndex: 'mastAgrId',
			align: 'center',
			render: (value, row, index) => {
				const id = row.mastAgrId;
				return <span>{id}</span>;
			}
		},
		{
			title: 'Overdue Amount',
			dataIndex: 'dtInstrumentDate',
			align: 'center',
			render: (value, row, index) => {
				const date = row.dtInstrumentDate;
				return <span>{date}</span>;
			}
		},
		{
			title: 'Allocation Amount',
			dataIndex: 'instrumentType',
			align: 'center',
			render: (value, row, index) => {
				const date = row.instrumentType;
				return <span>{date}</span>;
			}
		},
		{
			title: 'Balance Dues',
			dataIndex: 'instrumentStatus',
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
				return (
					<div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Loan ID</h5>
								<h5>
									<Link>{id}</Link>
								</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Overdue Amount</h5>
								<h5>{date}</h5>
							</span>
						</div>
						<div className='small-table-div'>
							<span>
								<h5 className='small-table-label'>Allocation Amount</h5>
								<h5>{type}</h5>
							</span>
							<span className='mobile-right-align'>
								<h5 className='small-table-label'>Balance Dues</h5>
								<h5>{status}</h5>
							</span>
						</div>
					</div>
				);
			}
		}
	];

	return (
		<div className='header_container'>
			<Table
				rowKey='mastAgrId'
				className='cust-table'
				dataSource={data}
				columns={isWebDevice ? webCols : deviceCols}
				pagination={false}
				scroll={{ y: 355 }}
			/>
		</div>
	);
};

export default ApportionTable;
