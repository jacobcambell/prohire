import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'gatsby'
import MainNavbar from '../../components/MainNavbar/MainNavbar';

interface Professional {
    id: number;
    fullname: string;
    location_from: string;
    profession: string;
    slug: string;
}

const PageAll = () => {

    const [pros, setPros] = useState<Professional[]>([]);

    useEffect(() => {
        getPros();
    }, []);

    const getPros = () => {
        axios.post<Professional[]>(`${process.env.GATSBY_API_ENDPOINT}/get-all-pros`).then((res) => {
            setPros(res.data);
        })
    }

    const deletePro = (id) => {
        axios.post(`${process.env.GATSBY_API_ENDPOINT}/delete-professional`, {
            id,
            admin_password: localStorage.getItem('admin_password')
        }, {
            headers: {
                admin_password: localStorage.getItem('admin_password') || ''
            }
        })
            .then((res) => {
                getPros();
            })
    }

    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className="w-1/2 m-auto my-3">
                <p className="text-xl">All Professionals</p>
                <Link to="/dashboard/create" className="bg-black text-white text-sm p-2 my-2 table">+ Create Professional</Link>

                {
                    pros && pros.map((pro) => (
                        <div key={pro.id} className="border border-spanishgrey p-3 my-3 flex">
                            <div className="w-1/3">
                                <p className='font-bold'>Full Name</p>
                                <p className="">{pro.fullname}</p>
                                <Link to={`/dashboard/edit?id=${pro.id}`} className='cursor-pointer text-sm mt-3 table bg-black text-white p-2'>Edit User</Link>
                            </div>
                            <div className="w-1/3">
                                <p className='font-bold'>Location</p>
                                <p className="">{pro.location_from}</p>
                                <Link to={`/dashboard/manage-images/${pro.id}`} className="cursor-pointer text-sm mt-3 table bg-spanishgrey text-white p-2">Images</Link>
                            </div>
                            <div className="w-1/3">
                                <p className='font-bold'>Profession</p>
                                <p className="">{pro.profession}</p>
                                <p onClick={() => { deletePro(pro.id) }} className="cursor-pointer text-sm mt-3 table bg-ultrared text-white p-2">Delete</p>
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PageAll;