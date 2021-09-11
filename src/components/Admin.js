const Admin = () => {
    return ( 
        <div className="admin">
            <p className="label">Username</p>
            <input type="text" className="field"/>

            <p className="label">Password</p>
            <input type="password" className="field" />

            <button className="submit">Login</button>
        </div>
     );
}
 
export default Admin;