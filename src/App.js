import './App.css';
import { Routes, Route, BrowserRouter } from 'react-router-dom';
import PrivateRoute from './component/Route/PrivateRoute';
// import PublicRoute from './component/Route/PublicRoute'
import SignIn from './component/SignIn';
import Dashboard from './container/Dashboard';
import Customer from './container/Customer/Customer';
import CustomerOverview from './container/CustomerOverview/CustomerOverview';
import AgreementOverview from './container/AgreementOverview/AgreementOverview';
import FutureDues from './container/FutureDues/FutureDues';
import Batch from './container/BatchControl/Batch';
import BatchDetails from './container/BatchDetails/BatchDetails';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					{/* <Route element={<PublicRoute />}> */}
						<Route path='/' element={<SignIn />} />
					{/* </Route> */}
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
						<Route path='batch-control' element={<Batch />} />
						<Route
							path='batch-control/:batchId'
							element={<BatchDetails />}
						/>
						<Route path='future-dues' element={<FutureDues />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
