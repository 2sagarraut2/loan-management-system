import './App.css';
import { Routes, Route } from 'react-router-dom';
import Layout from './component/Layout';
import Dashboard from './container/Dashboard';
import Customer from './container/Customer/Customer';
import CustomerOverview from './container/CustomerOverview/CustomerOverview';
import AgreementOverview from './container/AgreementOverview/AgreementOverview';

function App() {
	return (
		<div className='App'>
			<Layout>
				<Routes>
					<Route path='/' element={<Dashboard />} />
					<Route path='customer-search' element={<Customer />} />
					<Route
						path='customer-search/:userId'
						element={<CustomerOverview />}
					/>
					<Route
						path='agreement-overview/:userId/:agreementId'
						element={<AgreementOverview />}
					/>
				</Routes>
			</Layout>
		</div>
	);
}

export default App;
