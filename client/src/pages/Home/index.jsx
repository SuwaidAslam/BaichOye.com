import styles from "./styles.module.css";
import { Link } from "react-router-dom";

const Home = () => {
	const handleLogout = () => {
		localStorage.removeItem("token");
		window.location.reload();
	};

	return (
		<div className={styles.main_container}>
			<nav className={styles.navbar}>
				<h1>BaichOye</h1>
				<div>
					<Link to="/sell">
						<button className={styles.white_btn}>
							Sell
						</button>
					</Link>
					<button className={styles.white_btn} onClick={handleLogout}>
						Logout
					</button>
				</div>
			</nav>
		</div>
	);
};

export default Home;
