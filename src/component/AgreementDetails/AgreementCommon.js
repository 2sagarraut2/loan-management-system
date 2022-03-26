import React, { useState, useEffect } from 'react';
import { Typography, useMediaQuery } from '@material-ui/core';
import { useParams } from 'react-router-dom';
import { agreementInfo } from '../../api';
import BackButton from '../BackButton';

// common header component for all customer pages
const AgreementCommon = ({ children }) => {
	const { agreementId, userId } = useParams();
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const isWebDevice = useMediaQuery('(min-width: 705px)');

	// form hooks
	const [portfolio, setPortfolio] = useState('');
	const [status, setStatus] = useState('');

	useEffect(() => {
		setLoading(true);
		agreementInfo(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setPortfolio(data.portfolioCode);
					setStatus(data.agreementStatus);
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

	return (
		<div className='detail-header'>
			<div className='basic-title-wrapper'>
				<div className='title-container'>
					<Typography variant='h6'>Agreement Overview</Typography>
					<BackButton
						path={`/customer-search/${userId}`}
						size={isWebDevice ? 'medium' : 'small'}
						text='Basic Details'
					/>
				</div>
				<div className='agreement-common-wrapper'>
					<h4 className='customer-common-label'>Master Agreement ID</h4>
					<h4 className='customer-title customer-common-label'>
						{agreementId}
					</h4>
					<h4 className='customer-common-label'>Portfolio</h4>
					<h4 className='customer-title customer-common-label'>{portfolio}</h4>
					<h4 className='customer-common-label'>Status</h4>
					<h4 className='customer-title customer-common-label'>{status}</h4>
				</div>
			</div>
			{/* tabs will be rendered from here */}
			<div style={{ width: '100%' }}>{children}</div>
		</div>
	);
};

export default AgreementCommon;
