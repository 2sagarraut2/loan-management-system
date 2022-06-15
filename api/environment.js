export const baseURL = 'http://qa.4fin.in';

const env_urls = {
	DEV: 'http://qa.4fin.in',
	// STAGE: 'http://qa.4fin.in',
	PRODUCTION: 'https://qa.4fin.in'
};

const environments = {
	dev: {
		devDataLambda: `${env_urls.DEV}`
	},
	stage: {},
	production: {},
	uat: {}
};

export default environments[process.env.REACT_APP_ENV] || environments['dev'];
