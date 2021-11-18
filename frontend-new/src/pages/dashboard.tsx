import React, { useEffect } from 'react';
import { navigate } from 'gatsby-link';
import MainNavbar from '../components/MainNavbar/MainNavbar';

import Nav from './AdminNav/AdminNav';
import PageAll from './pages/PageAll';
import PageCreate from './pages/PageCreate';
import PageEdit from './pages/PageEdit';
import PageManageImages from './pages/PageManageImages';

const AdminDashboard = () => {
    useEffect(() => {
        // Check if user is logged in as admin
        if (localStorage.getItem('admin_password') === null) {
            navigate('/login')
        }
    }, []);

    return (
        <div>
            <MainNavbar></MainNavbar>

            {/* <Route path="/admin/dashboard/all">
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
            </Route> */}
        </div>
    );
}

export default AdminDashboard;