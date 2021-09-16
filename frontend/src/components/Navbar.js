import { Link } from "react-router-dom";
import styles from './css/Navbar.module.css';

const Navbar = () => {
    return (
        <div className={styles.navbar}>
            <Link to="/" className={styles.logo}>ProHire</Link>
        </div>
     );
}

export default Navbar;