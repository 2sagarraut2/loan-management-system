import React from 'react';
import AgreementDetails from '../../component/AgreementDetails/AgreementDetails';
import AgreementCommon from '../../component/AgreementDetails/AgreementCommon';
import '../../styles/agreementdetails.scss';

const AgreementOverview = () => {
	return (
		<div>
			<AgreementCommon>
				<AgreementDetails />
			</AgreementCommon>
		</div>
	);
};

export default AgreementOverview;
