import { useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Nav from './AdminNav/AdminNav';
import PageAll from './pages/PageAll';
import PageCreate from './pages/PageCreate';
import PageEdit from './pages/PageEdit';

import styles from './Dashboard.module.css';
import PageManageImages from './pages/PageManageImages';

const AdminDashboard = () => {

    let history = useHistory();

    useEffect(() => {
        // Check if user is logged in as admin
        if (localStorage.getItem('admin_password') === null) {
            history.push('/admin')
        }
        else {
            history.push('/admin/dashboard/all')
        }
    }, []);

    return (
        <div>
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
            <Route path="/admin/dashboard/manage-images/:id">
                <PageManageImages></PageManageImages>
            </Route>
        </div>
    );
}

export default AdminDashboard;