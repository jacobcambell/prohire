import styles from './css/Pages.module.css';
import { useState } from 'react';
import { useHistory } from 'react-router';

const PageCreate = () => {

    let history = useHistory();

    const [fullName, setFullName] = useState();
    const [location, setLocation] = useState();
    const [profession, setProfession] = useState();
    const [bio, setBio] = useState();
    const [slug, setSlug] = useState();

    const handleForm = () => {
        fetch('http://localhost:8080/create-professional', {
            method: 'post',
            body: JSON.stringify({
                fullname: fullName,
                location_from: location,
                profession: profession,
                bio: bio,
                slug: slug
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(result => result.json())
            .then((data) => {
                history.push('/admin/dashboard/all');
            })
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>Create Professional</p>

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

            <button onClick={handleForm} className={styles.addBtn}>Create</button>

        </div>
    );
}

export default PageCreate;