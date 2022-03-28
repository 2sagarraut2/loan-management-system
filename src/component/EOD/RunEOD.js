import React, { useEffect } from 'react';
import { Button, Typography, Grid } from '@material-ui/core';
import BackButton from '../BackButton';
import useMediaQuery from '@material-ui/core/useMediaQuery';

const RunEOD = (props) => {
	const { EOD, businessDate, getDate } = props;
	const isWebDevice = useMediaQuery('(min-width: 650px)');

	useEffect(() => {
		getDate();

		// eslint-disable-next-line
	}, []);

	const runEOD = () => {
		EOD();
	};

	return (
		<div>
			<div className='header_container'>
				<div className='title-container'>
					<Typography variant='h6'>Run EOD</Typography>
					<BackButton
						path='/dashboard'
						size={isWebDevice ? 'medium' : 'small'}
						text='Dashboard'
					/>
				</div>
				<Grid container spacing={2}>
					<Grid
						item
						xs={12}
						sm={6}
						md={2}
						lg={2}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						Business Date: {businessDate}
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'baseline',
							justifyContent: 'flex-start'
						}}>
						<Button
							variant='contained'
							color='primary'
							className='search-buttons'
							onClick={runEOD}>
							RUN EOD
						</Button>
					</Grid>
					<Grid
						item
						xs={12}
						sm={6}
						md={3}
						lg={3}
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'flex-start'
						}}></Grid>
				</Grid>
			</div>
		</div>
	);
};

export default RunEOD;
