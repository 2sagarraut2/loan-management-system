import { CheckUser } from '../api';

// for login
export const login = (requestParams) => {
	const login = CheckUser(requestParams)
		.then((res) => {
			if (res.status === 200 && res.data.data === true) {
				localStorage.setItem('user', requestParams.userId);
				return true;
			} else {
				return false;
			}
		})
		.catch((error) => {
			const {
				response: {
					data: { errorResponseMessage }
				}
			} = error;
			console.log(errorResponseMessage);
		});

	if (login) {
		return true;
	} else {
		return false;
	}
};

// for logout
export const logout = () => {
	localStorage.removeItem('user');
};

// to check user is logged in
export const isLogin = () => {
	if (localStorage.getItem('user')) {
		return true;
	}

	return false;
};

// to add commas to numbers
export const numberWithCommas = (x) => {
	if (x) {
		return x.toLocaleString('en-IN');
			// .toString()
			// .replace(/\D/g, '')
			// .replace(/(\d+?)(?=(\d\d)+(\d)(?!\d))(\.\d+)?/g, '$1,');
	} else {
		return x;
	}
};

// to download any file
export const downloadFile = (url, name = null) => {
	const downloadLink = document.createElement('a');
	downloadLink.setAttribute('href', url);
	downloadLink.setAttribute('rel', 'nofollow noopener');
	downloadLink.setAttribute('download', 'file');
	downloadLink.setAttribute('target', '_blank');
	if (Boolean(name)) {
		downloadLink.setAttribute('download', name);
	}
	downloadLink.click();
};

export const convertDate = (inputFormat) => {
	if (inputFormat) {
		function pad(s) {
			return s < 10 ? '0' + s : s;
		}
		var d = new Date(inputFormat);
		return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join('-');
	}
};
