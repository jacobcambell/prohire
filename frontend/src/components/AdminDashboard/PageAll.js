import styles from './css/Pages.module.css';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

const PageAll = () => {

    const [pros, setPros] = useState();

    useEffect(() => {
        // Get all professionals
        fetch('http://localhost:8080/getall')
            .then(result => result.json())
            .then(data => {
                setPros(data);
            })
    });

    const deletePro = (id) => {
        fetch('http://localhost:8080/delete-professional', {
            method: 'post',
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        });
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>All Professionals</p>
            <Link to="/admin/dashboard/create" className={styles.addBtn}>+ Create Professional</Link>

            {
                pros && pros.map((pro) => (
                    <Link to="/admin/dashboard/all" key={pro.id} className={styles.protile}>
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

                        <i onClick={() => { deletePro(pro.id) }} className="fas fa-trash"></i>
                    </Link>
                ))
            }
        </div>
    );
}

export default PageAll;