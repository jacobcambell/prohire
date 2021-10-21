import { Link } from "react-router-dom";
import { Theme } from "../Theme";

const MainNavbar = () => {
    return (
        <div style={styles.navbar}>
            <Link to="/" style={styles.logo}>ProHire</Link>
        </div>
    );
}

const styles = {
    navbar: {
        backgroundColor: Theme.colors.black,
        padding: '15px'
    },
    logo: {
        color: Theme.colors.white,
        textDecoration: 'none'
    }
};

export default MainNavbar;