import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './Pages.module.scss';

interface ProDetails {
    id: number,
    fullname: string,
    location_from: string,
    profession: string,
    bio: string,
    slug: string
}

const PageManageImages = () => {

    const [proname, setProname] = useState('');
    const [file, setFile] = useState<File | undefined>();

    const { id } = useParams<{ id: string }>();

    useEffect(() => {
        // Load pro's name into state on first render
        axios.post<ProDetails>(`${process.env.REACT_APP_API_ENDPOINT}/prodetailsbyid`, {
            id
        })
            .then((res) => {
                setProname(res.data.fullname)
            })
    }, []);

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleFormSubmit = async () => {
        // Check if file is set
        if (typeof file === 'undefined') {
            return;
        }

        // Create a new (empty) FormData object
        const formData = new FormData();

        // Append file to the form data
        formData.append('image', file);

        // Append proid to the form data
        formData.append('proid', id);

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin-image-upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {

            })
            .catch(() => { })
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>Managing Images for {proname}:</p>
            <input className={styles.file} onChange={onFileChange} type="file" accept='image/*'></input>
            <button className={styles.addBtn} onClick={handleFormSubmit}>Upload Images</button>
        </div>

    );
}

export default PageManageImages;