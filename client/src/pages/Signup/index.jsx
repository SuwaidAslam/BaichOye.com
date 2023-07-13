import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styles from "./styles.module.css";
import { useDispatch, useSelector } from "react-redux";
import { register, reset } from "../../redux/auth/authSlice";
import toast from "react-hot-toast";

const Signup = () => {
	const [data, setData] = useState({
		fullName: "",
		email: "",
		phone: "",
		password: "",
		password2: "",
	});

	const navigate = useNavigate();
	const dispatch = useDispatch();

	const { errorMessage, successMessage, isError, isSuccess, isLoading } =
		useSelector((selector) => selector.auth);

	useEffect(() => {
		if (isError) {
			toast.error(errorMessage);
		}

		if (isSuccess) {
			toast.success(successMessage);
			navigate("/login");
		}

		return () => dispatch(reset());
	}, [isError, isSuccess, errorMessage, successMessage, dispatch, navigate]);

	const handleChange = ({ target }) => {
		const { name, value } = target;
		setData((prevState) => ({
			...prevState,
			[name]: value,
		}));
	};

	const handleSubmit = (e) => {
		e.preventDefault();

		if (!validateFullName()) {
			toast.error("Please enter a valid name.");
			return;
		}

		if (!validateEmail()) {
			toast.error("Please enter a valid email.");

			return;
		}

		if (!validatePhone()) {
			toast.error("Please enter a valid phone number.");
			return;
		}

		if (data.password !== data.password2) {
			toast.error("Passwords do not match.");
			return;
		}
		if (!data.password || !data.password2) {
			toast.error("Please enter password.");
			return;
		}

		dispatch(register(data));
	};

	const validateFullName = () => {
		if (data.fullName.length < 3 || !/^[A-Za-z]+$/.test(data.fullName)) {
			return false;
		}
		return true;
	};

	const validateEmail = () => {
		const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailPattern.test(data.email)) {
			return false;
		}
		return true;
	};

	const validatePhone = () => {
		const phonePattern = /^[0-9+]+$/;
		if (!phonePattern.test(data.phone)) {
			return false;
		}
		return true;
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
					<div className={styles.form_section}>
						<form className={styles.form_container} onSubmit={handleSubmit} noValidate>
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
							<button type="submit" className={styles.green_btn}>
								Sign Up
							</button>
						</form>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Signup;
