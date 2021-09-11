import { useEffect, useState } from "react";
import { useHistory } from "react-router-dom";

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
        <div className="admin">
            <p className="label">Username</p>
            <input type="text" onChange={(e) => { setUsername(e.target.value) }} className="field"/>

            <p className="label">Password</p>
            <input type="password" onChange={(e) => { setPassword(e.target.value) }} className="field" />

            <button onClick={handleLogin} className="submit">Login</button>
        </div>
     );
}

export default Admin;