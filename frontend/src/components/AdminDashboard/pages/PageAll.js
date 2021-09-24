import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import styles from './Pages.module.css';

const PageAll = () => {

    const [pros, setPros] = useState();

    useEffect(() => {
        getPros();
    }, []);

    const getPros = () => {
        fetch('http://localhost:8080/getall')
            .then(result => result.json())
            .then(data => {
                setPros(data);
            })
    }

    const deletePro = (id) => {
        fetch('http://localhost:8080/delete-professional', {
            method: 'post',
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" },
            credentials: 'include'
        })
        .then(() => {
            getPros();
        })
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>All Professionals</p>
            <Link to="/admin/dashboard/create" className={styles.addBtn}>+ Create Professional</Link>

            {
                pros && pros.map((pro) => (
                    <div key={pro.id} className={styles.protile}>
                        <div className={styles.split}>
                            <p className={styles.header}>Full Name</p>
                            <p className={styles.content}>{pro.fullname}</p>
                        </div>
                        <div className={styles.split}>
                            <p className={styles.header}>Location</p>
                            <p className={styles.content}>{pro.location_from}</p>
                        </div>
                        <div className={styles.split}>
                            <p className={styles.header}>Profession</p>
                            <p className={styles.content}>{pro.profession}</p>
                        </div>
                        <div className={styles.split}>
                            <Link to={`/admin/dashboard/edit/${pro.id}`} className={styles.edit}>Edit</Link>
                        </div>

                        <i onClick={() => { deletePro(pro.id) }} className="fas fa-trash"></i>
                    </div>
                ))
            }
        </div>
    );
}

export default PageAll;