import { useEffect, useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import "./profile.css";
import { useDispatch, useSelector } from 'react-redux'
import { update, reset } from '../../redux/auth/authSlice'
import toast from 'react-hot-toast';


const MyProfile = () => {
  const user = JSON.parse(localStorage.getItem('user'))
  const [data, setData] = useState({
    fullName: user.fullName,
    email: user.email,
    phone: user.phone,
    // password: "",
    // password2: "",
  });
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.auth)

  useEffect(() => {
    if (isError) {
      toast.error(errorMessage)
    }

    if (isSuccess) {
      toast.success(successMessage)
      navigate("/");
    }

    return () => dispatch(reset())
  }, [isError, isSuccess, errorMessage, successMessage, dispatch])





  const handleChange = ({ currentTarget: input }) => {
    setData({ ...data, [input.name]: input.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    dispatch(update(data))
  };

  return (
    <form onSubmit={handleSubmit} className="profile_form">
      <h1 className="update_h1">Edit Profile</h1>
      <label className="profile_label">Full Name</label>
      <input
        type="text"
        placeholder="Full Name"
        name="fullName"
        onChange={handleChange}
        value={data.fullName}
        required
        className="profile_input"
      />
      <label className="profile_label">Email</label>
      <input
        type="email"
        placeholder="Email"
        name="email"
        onChange={handleChange}
        value={data.email}
        required
        className="profile_input"
      />
      <label className="profile_label">Mobile No</label>
      <input
        type="tel"
        placeholder="Phone"
        name="phone"
        onChange={handleChange}
        value={data.phone}
        required
        className="profile_input"
      />
      {/* <label className="profile_label">Name</label>
      <input
        type="password"
        placeholder="Password"
        name="password"
        onChange={handleChange}
        value={data.password}
        required
        className="profile_input"
      /> */}
      {/* <label className="profile_label">Name</label>
      <input
        type="password"
        placeholder="Confirm Password"
        name="password2"
        onChange={handleChange}
        value={data.password2}
        required
        className="profile_input"
      /> */}
      <button type="submit" className="profile_update_btn">
        Update
      </button>
    </form>
  );
};

export default MyProfile;