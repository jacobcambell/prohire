import axios from 'axios';
import { useState } from 'react';
import { useHistory } from 'react-router';

const PageCreate = () => {

    let history = useHistory();

    const [fullName, setFullName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [slug, setSlug] = useState<string>('');

    const handleForm = () => {
        axios.post(`${process.env.REACT_APP_API_ENDPOINT}/create-professional`, {
            admin_password: localStorage.getItem('admin_password'),
            fullname: fullName,
            location_from: location,
            profession: profession,
            bio: bio,
            slug: slug
        })
            .then((res) => {
                history.push('/admin/dashboard/all')
            })
    }

    return (
        <div className='container py-3'>
            <p className='fs-4'>Create Professional</p>

            <p className='fw-bold mb-1'>Full Name</p>
            <input onChange={(e) => { setFullName(e.target.value) }} type="text" className='form-control mb-3' />

            <p className='fw-bold mb-1'>Location</p>
            <input onChange={(e) => { setLocation(e.target.value) }} type="text" className='form-control mb-3' />

            <p className='fw-bold mb-1'>Profession</p>
            <input onChange={(e) => { setProfession(e.target.value) }} type="text" className='form-control mb-3' />

            <p className='fw-bold mb-1'>Bio</p>
            <textarea onChange={(e) => { setBio(e.target.value) }} className='form-control mb-3'></textarea>

            <p className='fw-bold mb-1'>Slug</p>
            <input onChange={(e) => { setSlug(e.target.value) }} type="text" className='form-control mb-3' />

            <button onClick={handleForm} className='btn btn-primary my-3'>Create</button>
        </div>
    );
}

export default PageCreate;