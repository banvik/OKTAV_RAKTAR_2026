import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import ProductsPage from './pages/ProductsPage'
import WarehousePage from "./pages/WareHousePage";
import BaseLayout from "./components/BaseLayout";
import NotFoundPage from "./pages/NotFoundPage";
import LoginPage from "./pages/LoginPage";
import RequireAuth from "./components/RequireAuth";
import RequireRole from "./components/RequireRole";

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
					<Route
						path="/products"
						element={
							<RequireRole role="raktárvezető">
							<ProductsPage />
							</RequireRole>
						}
					/>
					<Route path="*" element={<NotFoundPage />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App
