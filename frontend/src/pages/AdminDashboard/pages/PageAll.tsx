import axios from 'axios';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Pages.module.scss';

interface Professional {
    id: number;
    fullname: string;
    location_from: string;
    profession: string;
    slug: string;
}

const PageAll = () => {

    const [pros, setPros] = useState<Professional[]>([]);

    useEffect(() => {
        getPros();
    }, []);

    const getPros = () => {
        axios.post<Professional[]>(`${process.env.REACT_APP_API_ENDPOINT}/get-all-pros`).then((res) => {
            setPros(res.data);
        })
    }

    const deletePro = (id) => {
        axios.post('http://localhost:8080/delete-professional', {
            id,
            admin_password: localStorage.getItem('admin_password')
        }, {
            headers: {
                admin_password: localStorage.getItem('admin_password') || ''
            }
        })
            .then((res) => {
                getPros();
            })
    }

    return (
        <div className="container">
            <p className="fs-3 my-3">All Professionals</p>
            <Link to="/admin/dashboard/create" className="btn btn-primary">+ Create Professional</Link>

            {
                pros && pros.map((pro) => (
                    <div key={pro.id} className={styles.protile}>
                        <div className="row">
                            <div className="col-4">
                                <p className='m-0 fw-bold'>Full Name</p>
                                <p className={styles.content}>{pro.fullname}</p>
                                <Link to={`/admin/dashboard/edit/${pro.id}`} className='btn btn-success'><i className="fas fa-edit me-2"></i>Edit User</Link>
                            </div>
                            <div className="col-4">
                                <p className='m-0 fw-bold'>Location</p>
                                <p className={styles.content}>{pro.location_from}</p>
                                <Link to={`/admin/dashboard/manage-images/${pro.id}`} className="btn btn-primary"><i className="fas fa-images me-2"></i>Images</Link>
                            </div>
                            <div className="col-4">
                                <p className='m-0 fw-bold'>Profession</p>
                                <p className={styles.content}>{pro.profession}</p>
                                <p onClick={() => { deletePro(pro.id) }} className="btn btn-danger"><i className="fas fa-trash me-2"></i> Delete</p>
                            </div>
                        </div>
                    </div>
                ))
            }
        </div>
    );
}

export default PageAll;