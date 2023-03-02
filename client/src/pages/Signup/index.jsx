import { useEffect, useState } from "react";
// import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from 'react-redux'
import { register, reset } from '../../redux/auth/authSlice'
import toast from 'react-hot-toast';


const Signup = () => {
	const [data, setData] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
		password2: "",
	});
	// const [error, setError] = useState("");
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
			navigate("/login");
		}

		return () => dispatch(reset())
	}, [isError, isSuccess, errorMessage, successMessage, dispatch])





	const handleChange = ({ currentTarget: input }) => {
		setData({ ...data, [input.name]: input.value });
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		dispatch(register(data))
		// try {
		// 	console.log(data)
		// 	const url = "http://localhost:5000/api/users";
		// 	const { data: res } = await axios.post(url, data);
		// 	navigate("/login");
		// 	console.log(res.message);
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

	return (
		<div className={styles.signup_container}>
			<div className={styles.signup_form_container}>
				<div className={styles.left}>
					<h1>Welcome Back</h1>
					<Link to="/login">
						<button type="button" className={styles.white_btn}>
							Sign in
						</button>
					</Link>
				</div>
				<div className={styles.right}>
					<form className={styles.form_container} onSubmit={handleSubmit}>
						<h1>Create Account</h1>
						<input
							type="text"
							placeholder="Full Name"
							name="fullName"
							onChange={handleChange}
							value={data.fullName}
							required
							className={styles.input}
						/>
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
							type="tel"
							placeholder="Phone"
							name="phone"
							onChange={handleChange}
							value={data.phone}
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
						<input
							type="password"
							placeholder="Confirm Password"
							name="password2"
							onChange={handleChange}
							value={data.password2}
							required
							className={styles.input}
						/>
						{/* {error && <div className={styles.error_msg}>{error}</div>} */}
						<button type="submit" className={styles.green_btn}>
							Sign Up
						</button>
					</form>
				</div>
			</div>
		</div>
	);
};

export default Signup;