import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Sell from "./pages/Sell";


function App() {
	const user = localStorage.getItem("token");

	return (
		<div className="app">
			<Router>
				<Header />
				<Routes>
					{user && <Route path="/" exact element={<Home />} />}
					<Route path="/signup" exact element={<Signup />} />
					<Route path="/login" exact element={<Login />} />
					<Route path="/" element={<Navigate replace to="/login" />} />
					<Route path="/sell" exact element={<Sell />} />
				</Routes>
				<Footer />
			</Router>
			<Toaster />
		</div>
	);
}

export default App;