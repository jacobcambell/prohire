import { Link } from 'react-router-dom';
import styles from './Footer.module.css';

const Footer = () => {
    return (
        <div className={styles.footer}>
            <div className={styles.center}>
                <div className={styles.section}>
                    <p className={styles.title}>Resources</p>

                    <Link to="/" className={styles.link}>Link 1</Link>
                    <Link to="/" className={styles.link}>Link 2</Link>
                    <Link to="/" className={styles.link}>Link 3</Link>
                </div>
                <div className={styles.section}>
                    <p className={styles.title}>Account</p>

                    <Link to="/" className={styles.link}>Log In</Link>
                    <Link to="/" className={styles.link}>Register</Link>
                </div>
                <div className={styles.section}>
                    <p className={styles.title}>Support</p>

                    <Link to="/" className={styles.link}>Chat With Us</Link>
                </div>
            </div>
        </div>
    );
}

export default Footer;