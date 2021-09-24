import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './Nav';
import PageAll from './pages/PageAll';
import PageCreate from './pages/PageCreate';
import PageEdit from './pages/PageEdit';

import styles from './Dashboard.module.css';

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
        <div className={styles.dashboard}>
            <Nav></Nav>
            <Route path="/admin/dashboard/all">
                <PageAll></PageAll>
            </Route>
            <Route path="/admin/dashboard/create">
                <PageCreate></PageCreate>
            </Route>
            <Route path="/admin/dashboard/edit/:id">
                <PageEdit></PageEdit>
            </Route>
        </div>
     );
}

export default Dashboard;