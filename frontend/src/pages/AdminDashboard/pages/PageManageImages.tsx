import axios from 'axios';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

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

        // Append admin password to the form data
        let adminPass = localStorage.getItem('admin_password');

        if (adminPass === null) {
            // Admin pass not set for some reason
            return;
        }

        formData.append('admin_password', adminPass)

        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/admin-image-upload`, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
            .then(() => {

            })
            .catch(() => { })
    }

    return (
        <div className='container'>
            <p className='fs-5 pt-3'>Add Images for {proname}:</p>
            <input className='d-block mb-3' onChange={onFileChange} type="file" accept='image/*'></input>
            <button className='btn btn-success d-block' onClick={handleFormSubmit}>Upload Images</button>
        </div>

    );
}

export default PageManageImages;