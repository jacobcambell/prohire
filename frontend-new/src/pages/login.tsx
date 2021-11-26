import React, { useEffect, useState } from "react";
import axios from "axios";
import { navigate } from "gatsby-link";
import MainNavbar from '../components/MainNavbar/MainNavbar'

const AdminLogin = () => {
    const [password, setPassword] = useState('');

    useEffect(() => {
        // Check if already logged in
        if (localStorage.getItem('admin_password') !== null) {
            navigate('/dashboard')
        }
    }, [])
    const handleLogin = () => {
        interface AdminLoginResults {
            error: boolean;
        }

        axios.post<AdminLoginResults>(`${process.env.GATSBY_API_ENDPOINT}/adminlogin`, {
            password
        })
            .then((res) => {
                if (!res.data.error) {
                    // No error, so we will assume the password we sent was correct
                    localStorage.setItem('admin_password', password);
                    navigate('/admin/dashboard')
                }
                else {
                    alert('Invalid password')
                }
            })
    }

    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className="w-1/3 m-auto my-10">
                <p className="text-2xl mb-3 text-white">Admin Login</p>

                <p className="text-white">Password</p>
                <input type="password" onChange={(e) => { setPassword(e.target.value) }}
                    className="border border-spanishgrey w-full px-2 py-1"
                />

                <button onClick={handleLogin}
                    className="bg-black w-full text-white py-2 my-3"
                >Login</button>
            </div>
        </div>
    );
}

export default AdminLogin;