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
    }, []);

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
                    </Link>
                ))
            }
        </div>
    );
}

export default PageAll;