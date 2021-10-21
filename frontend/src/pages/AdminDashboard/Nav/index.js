import { Link, useHistory } from 'react-router-dom';
import styles from './Nav.module.css';

const Nav = () => {

    let history = useHistory();

    const handleLogout = () => {
        fetch('http://localhost:8080/logout', {
            credentials: 'include'
        })
        .then(result => {
            history.push('/admin');
        })
    }

    return (
        <div className={styles.nav}>
            <Link to="/admin/dashboard/all" className={styles.logo}>ProHire Admin</Link>

            <Link to="/admin/dashboard/all" className={styles.tab}><i className="fas fa-user-friends"></i> All Professionals</Link>
            <Link to="/admin/dashboard/create" className={styles.tab}><i className="fa fa-plus" aria-hidden="true"></i> Create Professional</Link>

            <div onClick={ handleLogout } className={`${styles.logout} ${styles.tab}`}>
                <i className="fas fa-sign-out-alt"></i> Logout
            </div>
        </div>
     );
}

export default Nav;