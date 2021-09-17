import styles from './css/Pages.module.css';
import { useEffect, useState } from 'react';

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
        </div>
    );
}

export default PageAll;