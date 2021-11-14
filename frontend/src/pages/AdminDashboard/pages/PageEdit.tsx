import axios from 'axios';
import { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import styles from './Pages.module.scss';

interface Professional {
    id: number;
    fullname: string;
    location_from: string;
    profession: string;
    slug: string;
    bio: string;
}

const PageEdit = () => {
    const { id } = useParams<{ id?: string }>();

    const [pro, setPro] = useState<Professional>({
        id: 0,
        fullname: '',
        location_from: '',
        profession: '',
        slug: '',
        bio: ''
    });

    let history = useHistory();

    useEffect(() => {
        axios.post<Professional>(`${process.env.REACT_APP_API_ENDPOINT}/prodetailsbyid`, {
            id
        })
            .then((res) => {
                setPro(res.data)
            })
            .catch(() => { })
    }, []);

    // Fetch to edit-professionals
    const handleForm = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/edit-professional`, {
            fullname: pro.fullname,
            location_from: pro.location_from,
            profession: pro.profession,
            bio: pro.bio,
            slug: pro.slug,
            id: id
        }, { headers: { admin_password: localStorage.getItem('admin_password') || '' } })
            .then((res) => {
                history.push('/admin/dashboard/all');
            })
            .catch(() => { })
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>Editing {pro.fullname}</p>

            <p className={styles.label}>Full Name</p>
            <input onChange={(e) => { setPro({ ...pro, fullname: e.target.value }) }} value={pro.fullname} type="text" className={styles.field} />

            <p className={styles.label}>Location</p>
            <input onChange={(e) => { setPro({ ...pro, location_from: e.target.value }) }} value={pro.location_from} type="text" className={styles.field} />

            <p className={styles.label}>Profession</p>
            <input onChange={(e) => { setPro({ ...pro, profession: e.target.value }) }} value={pro.profession} type="text" className={styles.field} />

            <p className={styles.label}>Bio</p>
            <textarea onChange={(e) => { setPro({ ...pro, bio: e.target.value }) }} value={pro.bio} className={styles.field}></textarea>

            <p className={styles.label}>Slug</p>
            <input onChange={(e) => { setPro({ ...pro, slug: e.target.value }) }} value={pro.slug} type="text" className={styles.field} />

            <button onClick={handleForm} className={styles.addBtn}>Confirm Changes</button>
        </div>
    );
}

export default PageEdit;