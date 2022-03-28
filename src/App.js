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
import EODStatus from './container/EODStatus/EODStatus';
import ViewCustomers from './container/AllCustomers/ViewCustomers';
import CashReceipt from './container/CashReceipt/CashReceipt';
import CreateCashReceipt from './component/CashReceipt/CreateCashReceipt';
import ChequeReceipt from './container/ChequeReceipt/ChequeReceipt';
import CreateChequeReceipt from './component/ChequeReceipt/CreateChequeReceipt';
import OnlineReceipt from './container/OnlinePayment/OnlinePayment';
import CreateOnlineReceipt from './component/OnlinePayment/CreateOnlineReceipt';
import EOD from './container/RunEOD/EOD';

function App() {
	return (
		<BrowserRouter>
			<div className='App'>
				<Routes>
					{/* <Route element={<PublicRoute />}> */}
					<Route path='/' element={<SignIn />} />
					{/* </Route> */}
					<Route element={<PrivateRoute />}>
						<Route path='view-customers' element={<ViewCustomers />} />
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
						<Route path='batch-control/:batchId' element={<BatchDetails />} />
						<Route path='future-dues' element={<FutureDues />} />
						<Route path='eod-status' element={<EODStatus />} />
						<Route path='cash-receipt' element={<CashReceipt />} />
						<Route
							path='cash-receipt/:userId/:mId'
							element={<CreateCashReceipt />}
						/>
						<Route path='cheque-receipt' element={<ChequeReceipt />} />
						<Route
							path='cheque-receipt/:userId/:mId'
							element={<CreateChequeReceipt />}
						/>
						<Route path='online-payment' element={<OnlineReceipt />} />
						<Route
							path='online-payment/:userId/:mId'
							element={<CreateOnlineReceipt />}
						/>
						<Route path='run-eod' element={<EOD />} />
					</Route>
				</Routes>
			</div>
		</BrowserRouter>
	);
}

export default App;
