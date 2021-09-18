import styles from './css/Pages.module.css';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PageEdit = () => {

    const [fullName, setFullName] = useState('');
    const [location, setLocation] = useState('');
    const [profession, setProfession] = useState('');
    const [bio, setBio] = useState('');
    const [slug, setSlug] = useState('');

    const { id } = useParams();

    const handleForm = () => {

    }

    useEffect(() => {
        fetch('http://localhost:8080/prodetailsbyid', {
            method: 'post',
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(result => result.json())
            .then((data) => {
                setFullName(data.fullname);
                setLocation(data.location_from);
                setProfession(data.profession);
                setBio(data.bio);
                setSlug(data.slug);
            })
    }, []);

    return (
        <div className={styles.page}>
            <p className={styles.title}>Editing {fullName}</p>

            <p className={styles.label}>Full Name</p>
            <input onChange={(e) => { setFullName(e.target.value) }} value={fullName} type="text" className={styles.field} />

            <p className={styles.label}>Location</p>
            <input onChange={(e) => { setLocation(e.target.value) }} value={location} type="text" className={styles.field} />

            <p className={styles.label}>Profession</p>
            <input onChange={(e) => { setProfession(e.target.value) }} value={profession} type="text" className={styles.field} />

            <p className={styles.label}>Bio</p>
            <textarea onChange={(e) => { setBio(e.target.value) }} value={bio} className={styles.field}></textarea>

            <p className={styles.label}>Slug</p>
            <input onChange={(e) => { setSlug(e.target.value) }} value={slug} type="text" className={styles.field} />

            <button onClick={handleForm} className={styles.addBtn}>Confirm Changes</button>
        </div>
     );
}

export default PageEdit;