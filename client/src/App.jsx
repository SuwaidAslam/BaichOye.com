import { Routes, Route } from 'react-router-dom';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Home from './pages/Home';
import AdDetails from './pages/AdDetail';
import { useDispatch } from 'react-redux';
import { useEffect } from 'react';
import { getUsers } from './actions/users';
import Footer from './components/Footer';
import Navbar from './components/Navbar';

function App() {
  // const dispatch = useDispatch();
  // useEffect(() => {
  //   dispatch(getUsers());
  // }, [dispatch])

  return (
    <>
      <Navbar />
      <div>
        <Routes>
          <Route exact path="login" element={<Login />}></Route>
          <Route exact path="signup" element={<Signup />}></Route>
          <Route exact path="/" element={<Home />}></Route>
          <Route exact path="item/:id" element={<AdDetails />}></Route>
        </Routes>
      </div>
      <Footer />
    </>
  )
}

export default App
