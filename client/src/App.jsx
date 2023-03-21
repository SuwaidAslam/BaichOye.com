import 'bootstrap/dist/css/bootstrap.min.css'
import { BrowserRouter as Router, Route, Routes, Navigate } from "react-router-dom";
import { Toaster } from 'react-hot-toast';
import Header from './components/Header';
import Footer from './components/Footer';
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import Sell from "./pages/Sell";
import Ad from './pages/Item';
import MyAds from './pages/MyAds';
import UpdateAd from './pages/UpdateAd';
import MyProfile from './pages/MyProfile';
import Chat from './pages/Chat';
import Inbox from './pages/Inbox';
import { PublicRoute, ProtectedRoute } from './utils/ProtectedRoute'



function App() {
	return (
		<div className="app">
			<Router>
				<Header />
				<Routes>
					<Route path="/" exact element={<Home />} />
					<Route path="/signup" exact element={<PublicRoute> <Signup /> </PublicRoute>} />
					<Route path="/login" exact element={<PublicRoute> <Login /> </PublicRoute>} />
					<Route path="/sell" exact element={<ProtectedRoute> <Sell /> </ProtectedRoute>} />
					<Route path="/myads" exact element={<ProtectedRoute> <MyAds /> </ProtectedRoute>} />
					<Route path="/profile" exact element={<ProtectedRoute> <MyProfile /> </ProtectedRoute>} />
					<Route path="/chat/:user/:item" exact element={<ProtectedRoute> <Chat /> </ProtectedRoute>} />
					<Route path="/inbox" exact element={<ProtectedRoute> <Inbox /> </ProtectedRoute>} />
					<Route path="/update/item/:id" exact element={<ProtectedRoute> <UpdateAd /> </ProtectedRoute>} />
					<Route path="/item/:id" element={<ProtectedRoute> <Ad /> </ProtectedRoute>} />
				</Routes>
				<Footer />
			</Router>
			<Toaster />
		</div>
	);
}

export default App;