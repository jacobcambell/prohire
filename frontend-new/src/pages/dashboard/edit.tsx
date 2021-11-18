import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { navigate } from 'gatsby-link';
import { NumberParam, useQueryParam } from 'use-query-params';
import MainNavbar from '../../components/MainNavbar/MainNavbar';

interface Professional {
    id: number;
    fullname: string;
    location_from: string;
    profession: string;
    slug: string;
    bio: string;
}

const PageEdit = () => {
    const [id, setId] = useQueryParam('id', NumberParam)

    const [pro, setPro] = useState<Professional>({
        id: 0,
        fullname: '',
        location_from: '',
        profession: '',
        slug: '',
        bio: ''
    });

    useEffect(() => {
        axios.post<Professional>(`${process.env.GATSBY_API_ENDPOINT}/prodetailsbyid`, {
            id
        })
            .then((res) => {
                setPro(res.data)
            })
            .catch(() => { })
    }, []);

    // Fetch to edit-professionals
    const handleForm = () => {
        axios.post(`${process.env.GATSBY_API_ENDPOINT}/edit-professional`, {
            fullname: pro.fullname,
            location_from: pro.location_from,
            profession: pro.profession,
            bio: pro.bio,
            slug: pro.slug,
            id: id
        }, { headers: { admin_password: localStorage.getItem('admin_password') || '' } })
            .then((res) => {
                navigate('/dashboard/all');
            })
            .catch(() => { })
    }

    const inputClass = 'border border-spanishgrey py-1 px-3 w-full mb-3';

    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className='w-1/3 m-auto my-3'>
                <p className='text-xl'>Editing {pro.fullname}</p>

                <p className='font-bold'>Full Name</p>
                <input onChange={(e) => { setPro({ ...pro, fullname: e.target.value }) }} value={pro.fullname} type="text"
                    className={inputClass}
                />

                <p className='font-bold'>Location</p>
                <input onChange={(e) => { setPro({ ...pro, location_from: e.target.value }) }} value={pro.location_from} type="text"
                    className={inputClass}
                />

                <p className='font-bold'>Profession</p>
                <input onChange={(e) => { setPro({ ...pro, profession: e.target.value }) }} value={pro.profession} type="text"
                    className={inputClass}
                />

                <p className='font-bold'>Bio</p>
                <textarea onChange={(e) => { setPro({ ...pro, bio: e.target.value }) }} value={pro.bio}
                    className={inputClass}></textarea>

                <p className='font-bold'>Slug</p>
                <input onChange={(e) => { setPro({ ...pro, slug: e.target.value }) }} value={pro.slug} type="text"
                    className={inputClass}
                />

                <button onClick={handleForm}
                    className='bg-black text-white p-2'>Confirm Changes</button>
            </div>
        </div>
    );
}

export default PageEdit;