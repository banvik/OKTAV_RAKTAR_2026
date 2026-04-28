import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from './pages/ProductsPage'
import WarehousePage from "./pages/WareHousePage";
import BaseLayout from "./components/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";

function App() {
	return (
		<Router>
			<Routes>
				<Route path="/login" element={<LoginPage />} />
				<Route
					path="/"
					element={
						<RequireAuth>
							<BaseLayout />
						</RequireAuth>
					}
				>
					<Route index element={<WarehousePage />} />
					<Route path="products" element={<ProductsPage />} />
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App
