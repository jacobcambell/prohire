import React from 'react'
import axios from 'axios';
import { useEffect, useState } from 'react';
import { useQueryParam, NumberParam } from 'use-query-params';
import MainNavbar from '../../components/MainNavbar/MainNavbar'
import { FaMinusCircle } from 'react-icons/fa'
import { Link } from 'gatsby'
interface ProDetails {
    id: number,
    fullname: string,
    location_from: string,
    profession: string,
    bio: string,
    slug: string
}

interface ProImage {
    image_name: string;
    id: number;
}

const PageManageImages = () => {

    const [proname, setProname] = useState('');
    const [file, setFile] = useState<File | undefined>();
    const [proimages, setProimages] = useState<ProImage[]>([]);

    const [id, setId] = useQueryParam('id', NumberParam)

    useEffect(() => {
        loadData()
    }, []);

    const loadData = () => {
        // Load pro's name into state on first render
        axios.post<ProDetails>(`${process.env.GATSBY_API_ENDPOINT}/prodetailsbyid`, {
            id
        })
            .then((res) => {
                setProname(res.data.fullname)
            })

        // Load images for this pro
        axios.post<ProImage[]>(`${process.env.GATSBY_API_ENDPOINT}/getimagesbyproid`, {
            proid: id
        }).then((res) => {
            setProimages(res.data)
        })
    }

    const onFileChange = (e) => {
        setFile(e.target.files[0]);
    }

    const handleFormSubmit = async () => {
        // Create a new (empty) FormData object
        const formData = new FormData();

        // Append proid to the form data
        formData.append('proid', String(id));

        // Check if file is set
        if (typeof file === 'undefined') {
            return;
        }

        // Append file to the form data
        formData.append('image', file);

        interface uploadReturn {
            error: boolean;
        }

        axios.post<uploadReturn>(
            `${process.env.GATSBY_API_ENDPOINT}/admin-image-upload`,
            formData,
            {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    admin_password: localStorage.getItem('admin_password') || ''
                }
            }
        )
            .then((res) => {
                if (!res.data.error) {
                    loadData()
                    return;
                }
            })
            .catch(() => { })
    }

    const deleteImage = (id: number) => {
        axios.post(`${process.env.GATSBY_API_ENDPOINT}/delete-proimage`, {
            image_id: id
        }, { headers: { admin_password: localStorage.getItem('admin_password') || '' } }).then(() => {
            loadData()
        }).catch((e) => {
            console.log('big fat error')
        })
    }

    return (
        <div>
            <MainNavbar></MainNavbar>
            <div className='px-5 py-5 text-white'>
                <Link to="/dashboard/all" className="bg-blue-500 p-2 mb-5 table">Go back</Link>

                <p className='text-xl mb-5'>Add Images for {proname}:</p>
                <input className='block mb-3' onChange={onFileChange} type="file" accept='image/*'></input>
                <button className='bg-green-400 text-white p-2 block' onClick={handleFormSubmit}>Upload Images</button>

                <p className="text-xl mt-5">Current Images</p>
                {
                    proimages && proimages.map(img => (
                        <div style={{ ...image, backgroundImage: `url(${process.env.GATSBY_API_ENDPOINT}/images/${img.image_name})` }} key={img.id}>
                            <FaMinusCircle className="text-red-500 bg-white rounded-full cursor-pointer" onClick={() => { deleteImage(img.id) }} />
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default PageManageImages;

const image = {
    width: '150px',
    height: '150px',
    display: 'inline-flex',
    marginRight: '10px',
    backgroundRepeat: 'no-repeat',
    backgroundSize: 'cover',
    backgroundPosition: 'center',
    justifyContent: 'right',
    alignItems: 'start',
    padding: '5px'
}