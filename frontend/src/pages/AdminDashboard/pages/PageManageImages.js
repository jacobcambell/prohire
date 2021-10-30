import styles from './Pages.module.scss';

import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const PageManageImages = () => {

    // This pro's name
    const [proname, setProname] = useState('');

    // An array of files
    const [files, setFiles] = useState([]);

    const { id } = useParams();

    // Load pro's name into state on first render
    useEffect(() => {
        fetch("http://localhost:8080/prodetailsbyid", {
            method: "POST",
            body: JSON.stringify({
                id: id
            }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
            .then(results => results.json())
            .then(data => {
                setProname(data.fullname);
            })
    }, []);

    // Update files array in state every time the user changes the html input form
    const onFileChange = (e) => {
        let newFiles = [];

        // For all the files in the html form, add them to the array
        for (let i = 0; i < e.target.files.length; i++) {
            newFiles.push(e.target.files[i]);
        }

        // Update state with new files array
        setFiles(newFiles);
    }

    const handleFormSubmit = () => {
        // Create a new (empty) FormData object
        const formData = new FormData();

        // User does not have any images in the store
        if (files.length === 0) {
            return;
        }

        // Append each image to the formData object
        for (let i = 0; i < files.length; i++) {
            formData.append('images', files[i]);
        }

        // Append proid to the form data
        formData.append('proid', 56);

        fetch("http://localhost:8080/admin-image-upload", {
            method: "POST",
            body: formData,
            credentials: 'include'
        }).then(() => {
            console.log('done')
        })
    }

    return (
        <div className={styles.page}>
            <p className={styles.title}>Managing Images for {proname}:</p>
            <input className={styles.file} onChange={onFileChange} type="file" multiple="multiple"></input>
            <button className={styles.addBtn} onClick={handleFormSubmit}>Upload Images</button>
        </div>
    );
}

export default PageManageImages;