import React, { useState } from 'react';
import axios from 'axios';
import { navigate } from 'gatsby-link';
import MainNavbar from '../../components/MainNavbar/MainNavbar';

const PageCreate = () => {
    const [fullName, setFullName] = useState<string>('');
    const [location, setLocation] = useState<string>('');
    const [profession, setProfession] = useState<string>('');
    const [bio, setBio] = useState<string>('');
    const [slug, setSlug] = useState<string>('');

    const handleForm = () => {
        axios.post(`${process.env.GATSBY_API_ENDPOINT}/create-professional`, {
            fullname: fullName,
            location_from: location,
            profession: profession,
            bio: bio,
            slug: slug
        }, { headers: { admin_password: localStorage.getItem('admin_password') || '' } })
            .then((res) => {
                navigate('/dashboard/all')
            })
    }

    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className='w-1/3 m-auto my-3'>
                <p className='text-xl mb-3'>Create Professional</p>

                <p className='font-bold'>Full Name</p>
                <input onChange={(e) => { setFullName(e.target.value) }} type="text"
                    className='border border-spanishgrey w-full mb-3 p-2'
                />

                <p className='font-bold'>Location</p>
                <input onChange={(e) => { setLocation(e.target.value) }} type="text"
                    className='border border-spanishgrey w-full mb-3 p-2'
                />

                <p className='font-bold'>Profession</p>
                <input onChange={(e) => { setProfession(e.target.value) }} type="text"
                    className='border border-spanishgrey w-full mb-3 p-2'
                />

                <p className='font-bold'>Bio</p>
                <textarea onChange={(e) => { setBio(e.target.value) }}
                    className='border border-spanishgrey w-full mb-3 p-2'>
                </textarea>

                <p className='font-bold'>Slug</p>
                <input onChange={(e) => { setSlug(e.target.value) }} type="text"
                    className='border border-spanishgrey w-full mb-3 p-2'
                />

                <button onClick={handleForm} className="bg-black text-white p-2 w-full">Create +</button>
            </div>
        </div>
    );
}

export default PageCreate;