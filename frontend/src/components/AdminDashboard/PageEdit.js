import styles from './css/Pages.module.css';
import { useState } from 'react';
import { useParams } from 'react-router-dom';

const PageEdit = () => {

    const [fullName, setFullName] = useState();
    const [location, setLocation] = useState();
    const [profession, setProfession] = useState();
    const [bio, setBio] = useState();
    const [slug, setSlug] = useState();

    const { id } = useParams();

    const handleForm = () => {
        alert(id);
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>Editing Professional</p>

            <p className={styles.label}>Full Name</p>
            <input onChange={(e) => { setFullName(e.target.value) }} type="text" className={styles.field} />

            <p className={styles.label}>Location</p>
            <input onChange={(e) => { setLocation(e.target.value) }} type="text" className={styles.field} />

            <p className={styles.label}>Profession</p>
            <input onChange={(e) => { setProfession(e.target.value) }} type="text" className={styles.field} />

            <p className={styles.label}>Bio</p>
            <textarea onChange={(e) => { setBio(e.target.value) }} className={styles.field}></textarea>

            <p className={styles.label}>Slug</p>
            <input onChange={(e) => { setSlug(e.target.value) }} type="text" className={styles.field} />

            <button onClick={handleForm} className={styles.addBtn}>Confirm Changes</button>
        </div>
     );
}

export default PageEdit;