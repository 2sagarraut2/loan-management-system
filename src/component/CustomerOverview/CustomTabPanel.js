import React from 'react';

const CustomTabPanel = (props) => {
	const { children, value, index } = props;
	return (
		<>
			{value === index && (
				<div
					style={{
						width: '100%',
						maxHeight: '30rem',
						overflowY: 'auto'
					}}>
					{children}
				</div>
			)}
		</>
	);
};

export default CustomTabPanel;
