import { useEffect, useState } from "react";
// import axios from "axios";
import { useDispatch, useSelector } from 'react-redux'
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { login, reset } from '../../redux/auth/authSlice'
import { ThreeDots } from 'react-loader-spinner'
import toast from 'react-hot-toast';


const Login = () => {
	const [data, setData] = useState({ email: "", password: "" });
	// const [error, setError] = useState("");
	const dispatch = useDispatch()
	const navigate = useNavigate()

	const { errorMessage, successMessage, isError, isSuccess, isLoading } =
    useSelector((selector) => selector.auth)

	
	useEffect(() => {
		if (isError) {
		  toast.error(errorMessage)
		}
	
		if (isSuccess) {
		  toast.success(successMessage)
		  navigate('/')
		}
	
		return () => dispatch(reset())
	  }, [isError, isSuccess, errorMessage, successMessage, dispatch, navigate])

	  useEffect(() => {}, [dispatch])


	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(login(data))
		// try {
		// 	const url = "http://localhost:5000/api/auth";
		// 	const { data: res } = await axios.post(url, data);
		// 	localStorage.setItem("token", res.data);
		// 	window.location = "/";
		// } catch (error) {
		// 	if (
		// 		error.response &&
		// 		error.response.status >= 400 &&
		// 		error.response.status <= 500
		// 	) {
		// 		setError(error.response.data.message);
		// 	}
		// }
	};

	if (isLoading) {
		return (
		  <div
			style={{
			  height: '100vh',
			  display: 'flex',
			  justifyContent: 'center',
			  alignItems: 'center',
			}}
		  >
			<ThreeDots color="#3a77ff" height={100} width={100} />
		  </div>
		)
	  }

	return (
		<div className={styles.login_container}>
			<div className={styles.login_form_container}>
				<div className={styles.left}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Login to Your Account</h1>
						<input
							type="email"
							placeholder="Email"
							name="email"
							onChange={handleChange}
							value={data.email}
							required
							className={styles.input}
						/>
						<input
							type="password"
							placeholder="Password"
							name="password"
							onChange={handleChange}
							value={data.password}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign In
						</button>
					</form>
				</div>
				<div className={styles.right}>
					<h1>New Here ?</h1>
					<Link to="/signup">
						<button type="button" className={styles.white_btn}>
							Sign Up
						</button>
					</Link>
				</div>
			</div>
		</div>
	);
};

export default Login;