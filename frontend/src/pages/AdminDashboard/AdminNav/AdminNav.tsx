import { Link, useHistory } from 'react-router-dom';

const Nav = () => {

    let history = useHistory();

    const handleLogout = () => {
        fetch('http://localhost:8080/logout', {
            credentials: 'include'
        })
            .then(result => {
                history.push('/admin');
            })
    }

    return (
        <div className='bg-dark py-2 px-3'>
            <div className="row">
                <div className="col-12 col-md-3">
                    <Link to="/admin/dashboard/all" className='text-white fs-5 text-decoration-none'>ProHire Admin</Link>
                </div>
                <div className="col-12 my-1 col-md-9">
                    <Link to="/admin/dashboard/all" className='text-white text-decoration-none mx-2'><i className="fas fa-user-friends"></i> All Professionals</Link>
                    <Link to="/admin/dashboard/create" className='text-white text-decoration-none mx-2'><i className="fa fa-plus" aria-hidden="true"></i> Create Professional</Link>
                </div>
            </div>
        </div >
    );
}

export default Nav;