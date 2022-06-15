import React, { useState, useEffect } from 'react';
import { Grid, Snackbar } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import Loader from '../Loader';
import { useParams } from 'react-router-dom';
import { agreementInfo } from '../../api';
import { numberWithCommas } from '../../utils';

const ActualAgreementOverview = () => {
	const [loading, setLoading] = useState(false);
	const [successMsg, setSuccessMsg] = useState('');
	const [errorMsg, setErrorMsg] = useState('');

	const { agreementId } = useParams();

	// form hooks
	const [od, setOd] = useState(0);
	const [homeBranch, setHomeBranch] = useState('');
	const [servicingBranch, setServicingBranch] = useState('');
	const [product, setProduct] = useState('');
	const [sacntionedAmount, setSanctionedAmount] = useState('');
	const [loanAmount, setLoanAmount] = useState('');
	const [previousInstallment, setPreviuosInstallment] = useState('');
	const [nextInstallment, setNextInstallment] = useState('');
	const [previousInstallmentDate, setPreviousInstallmentDate] = useState('');
	const [nextInstallmentDate, setNextInstallmentDate] = useState('');
	const [overdue, setOverdue] = useState('');
	const [outstanding, setOutstanding] = useState('');
	const [excessAmount, setExcessAmount] = useState('');
	const [assetQuality, setAssetQuality] = useState('');
	const [DPDStatus, setDPDStatus] = useState('');
	const [colender, setColender] = useState([]);
	const [odDate, SetOdDate] = useState('');
	const [avaLimit, setAvaLimit] = useState('');
	const [utiLimit, setUtiLimit] = useState('');

	useEffect(() => {
		setLoading(true);
		agreementInfo(agreementId)
			.then((res) => {
				if (res.status === 200) {
					const { data } = res;
					setOd(data.odYn);
					setHomeBranch(data.homeBranch);
					setServicingBranch(data.servBranch);
					setProduct(data.productCode);
					setSanctionedAmount(data.sanctionedAmount);
					setLoanAmount(data.loanAmount);
					setPreviuosInstallment(data.prevInstallmentAmount);
					setNextInstallment(data.nextInstallmentAmount);
					setPreviousInstallmentDate(data.dtPrevInstallment);
					setNextInstallmentDate(data.dtNextInstallment);
					setOverdue(data.overdueAmount);
					setOutstanding(data.outstandingAmount);
					setExcessAmount(data.excessAmount);
					setAssetQuality(data.assetClass);
					setDPDStatus(data.dpd);
					setColender(data.colender);
					SetOdDate(data.dtOdClosure);
					setAvaLimit(data.availableLimit);
					setUtiLimit(data.utilizedLimit);
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
					<h4>Home Branch</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{homeBranch}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Servicing Branch</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{servicingBranch}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Product</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{product}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Sanctioned Amount/Loan</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{numberWithCommas(sacntionedAmount)}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Loan Amount/Utilized</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(loanAmount)}</h4>
				</Grid>
				{od === 'true' ? (
					<>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4>Previous Interest Amount</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4 className='customer-title'>
								{numberWithCommas(previousInstallment)}
							</h4>
						</Grid>
					</>
				) : (
					<>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4>Previous Installment Amount</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4 className='customer-title'>
								{numberWithCommas(previousInstallment)}
							</h4>
						</Grid>
					</>
				)}
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Next Installment Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>
						{numberWithCommas(nextInstallment)}
					</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Previous Installment Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{previousInstallmentDate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Next Installment Date</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{nextInstallmentDate}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Overdue Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(overdue)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Outstanding Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(outstanding)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Excess Amount</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{numberWithCommas(excessAmount)}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Asset Quality</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{assetQuality}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>DPD/NPA Status</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4 className='customer-title'>{DPDStatus}</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<h4>Co-lender Name</h4>
				</Grid>
				<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
					<span className='customer-title'>
						{colender.map((item) => `${item}, `)}
					</span>
				</Grid>
				{od === 'true' ? (
					<>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4>OD Closure Date</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4 className='customer-title'>{odDate}</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4>Available Limit</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4 className='customer-title'>{avaLimit}</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4>Utilized Limit</h4>
						</Grid>
						<Grid item xs={6} sm={6} md={3} lg={3} style={{ padding: '1%' }}>
							<h4 className='customer-title'>{utiLimit}</h4>
						</Grid>
					</>
				) : (
					''
				)}
			</Grid>
		</div>
	);
};

export default ActualAgreementOverview;
