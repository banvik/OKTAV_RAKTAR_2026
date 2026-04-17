import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from './pages/ProductsPage'
import WarehousePage from "./pages/WareHousePage";
import TransactionsPage from "./pages/TransactionsPage";
import BaseLayout from "./components/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";

function App() {
  return (
		<Router>
			<Routes>
				<Route path="/" element={<BaseLayout />}>
					<Route index element={<ProductsPage />} />
					<Route path="/warehouses" element={<WarehousePage />} />
					<Route
						path="/transactions"
						element={<TransactionsPage />}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Router>
  );
}

export default App
