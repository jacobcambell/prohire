import axios from "axios";
import { useState } from "react";
import { useHistory } from "react-router-dom";
import styles from './AdminLogin.module.css';

const AdminLogin = () => {

    let history = useHistory();

    const [password, setPassword] = useState('');

    const handleLogin = () => {
        interface AdminLoginResults {
            error: boolean;
        }

        axios.post<AdminLoginResults>(`${process.env.REACT_APP_API_ENDPOINT}/adminlogin`, {
            password
        })
            .then((res) => {
                if (!res.data.error) {
                    // No error, so we will assume the password we sent was correct
                    localStorage.setItem('admin_password', password);
                    history.push('/admin/dashboard')
                }
                else {
                    alert('Invalid password')
                }
            })
    }

    return (
        <div className="bg-dark text-white p-3">
            <div className="container">
                <p className="fs-3">Admin</p>

                <p className="mb-1">Password</p>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="form-control" />

                <button onClick={handleLogin} className="btn btn-primary my-3">Login</button>
            </div>
        </div>
    );
}

export default AdminLogin;