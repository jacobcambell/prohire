import { Link } from 'react-router-dom';
import styles from './Footer.module.scss';

const MainFooter = () => {
    return (
        <div className="bg-dark py-3">
            <div className="container">
                <div className="row">
                    <div className="col-12 col-md-3 mb-3">
                        <h5 className="text-white">Resources</h5>
                        <Link to="/" className="d-block text-white text-decoration-none">link 1</Link>
                        <Link to="/" className="d-block text-white text-decoration-none">link 2</Link>
                        <Link to="/" className="d-block text-white text-decoration-none">link 3</Link>
                    </div>
                    <div className="col-12 col-md-3 mb-3">
                        <h5 className="text-white">Other Links</h5>
                        <Link to="/" className="d-block text-white text-decoration-none">link 1</Link>
                        <Link to="/" className="d-block text-white text-decoration-none">link 2</Link>
                        <Link to="/" className="d-block text-white text-decoration-none">link 3</Link>
                    </div>
                </div>
            </div>
        </div>
        // <div className={styles.footer}>
        //     <div className={styles.center}>
        //         <div className={styles.section}>
        //             <p className={styles.title}>Resourcesx</p>

        //             <Link to="/" className={styles.link}>Link 1</Link>
        //             <Link to="/" className={styles.link}>Link 2</Link>
        //             <Link to="/" className={styles.link}>Link 3</Link>
        //         </div>
        //         <div className={styles.section}>
        //             <p className={styles.title}>Account</p>

        //             <Link to="/" className={styles.link}>Log In</Link>
        //             <Link to="/" className={styles.link}>Register</Link>
        //         </div>
        //         <div className={styles.section}>
        //             <p className={styles.title}>Support</p>

        //             <Link to="/" className={styles.link}>Chat With Us</Link>
        //         </div>
        //     </div>
        // </div>
    );
}

export default MainFooter;