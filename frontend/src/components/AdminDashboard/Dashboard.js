import styles from './css/Dashboard.module.css';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

const Dashboard = () => {

    let history = useHistory();

    useEffect(() => {
        fetch('http://localhost:8080/adminloggedin', {
            credentials: 'include'
        })
        .then(result => result.json())
        .then((data) => {
            if(!data.admin_logged_in){
                // User is not logged in as an admin, redirect to login component
                history.push('/admin/');
            }
        })
    }, []);

    return (
        <div>admin dashboard</div>
     );
}

export default Dashboard;