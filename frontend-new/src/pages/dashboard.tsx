import React, { useEffect } from 'react';
import { navigate } from 'gatsby-link';

const AdminDashboard = () => {
    useEffect(() => {
        // Check if user is logged in as admin
        if (localStorage.getItem('admin_password') !== null) {
            navigate('/dashboard/all')
        } else {
            navigate('/login')
        }
    }, []);

    return (
        <div></div>
    );
}

export default AdminDashboard;