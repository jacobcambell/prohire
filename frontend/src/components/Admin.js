import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";
import styles from './css/Admin.module.css';

const Admin = () => {

    let history = useHistory();

    const [username, setUsername] = useState();
    const [password, setPassword] = useState();

    const handleLogin = () => {
        fetch('http://localhost:8080/adminlogin', {
            method: 'post',
            body: JSON.stringify({username, password}),
            headers: {"Content-type": "application/json; charset=UTF-8"},
            credentials: 'include'
        })
        .then(result => result.json())
        .then((data) => {
            // history.push('/');
            console.log(data)
        })
    }

    useEffect(() => {
        fetch('http://localhost:8080/adminloggedin', {
            credentials: 'include'
        })
        .then(result => result.json())
        .then((data) => {
            console.log(data)
        })
    }, [])

    return (
        <div className={styles.admin}>
            <p className={styles.label}>Username</p>
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} className={styles.field}/>

            <p className={styles.label}>Password</p>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} className={styles.field} />

            <button onClick={handleLogin} className={styles.submit}>Login</button>
        </div>
     );
}

export default Admin;