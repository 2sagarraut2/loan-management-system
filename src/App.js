import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import Dashboard from './container/Dashboard';
import Customer from './container/Customer/Customer';
import CustomerOverview from './container/CustomerOverview/CustomerOverview';
import AgreementOverview from './container/AgreementOverview/AgreementOverview';
import PrivateRoute from './component/Route/PrivateRoute';
import PublicRoute from './component/Route/PrivateRoute';
import SignIn from './component/SignIn';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					<Route path='/' element={<SignIn />} />
					<Route element={<PrivateRoute />}>
						<Route path='/dashboard' element={<Dashboard />} />
						<Route path='customer-search' element={<Customer />} />
						<Route
							path='customer-search/:userId'
							element={<CustomerOverview />}
						/>
						<Route
							path='agreement-overview/:userId/:agreementId'
							element={<AgreementOverview />}
						/>
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
