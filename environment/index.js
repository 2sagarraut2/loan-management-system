export const baseURL = 'http://qa.4fin.in';

const env_urls = {
	DEV: 'http://qa.4fin.in',
	// STAGE: 'http://qa.4fin.in',
	PRODUCTION: 'https://qa.4fin.in'
};

const environments = {
	dev: {
		dataURL: `${env_urls.DEV}`
	},
	production: {
        dataURL: `${env_urls.PRODUCTION}`
    }
};

export default environments[process.env.REACT_APP_ENV] || environments['dev'];
