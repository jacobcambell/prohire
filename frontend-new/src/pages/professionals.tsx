import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useQueryParam, NumberParam } from 'use-query-params'
import MainNavbar from '../components/MainNavbar/MainNavbar'
import { FaCalendarAlt } from 'react-icons/fa'
import ImageGallery, { ReactImageGalleryItem } from 'react-image-gallery'

const idmages = [
    {
        original: 'https://picsum.photos/id/1018/1000/600/',
    },
    {
        original: 'https://picsum.photos/id/1015/1000/600/',
    },
    {
        original: 'https://picsum.photos/id/1019/1000/600/',
    },
];

interface Pro {
    id: number,
    fullname: string,
    location_from: string,
    profession: string,
    bio: string
}

interface Image {
    id: number,
    image_name: string;
}

export default function professionals() {

    const [id, setId] = useQueryParam('id', NumberParam)

    const [pro, setPro] = useState<Pro>({
        id: 0,
        fullname: '',
        location_from: '',
        profession: '',
        bio: ''
    })
    const [images, setImages] = useState<ReactImageGalleryItem[]>([])

    useEffect(() => {
        axios.post(`${process.env.GATSBY_API_ENDPOINT}/prodetailsbyid`, {
            id
        }).then(results => {
            setPro(results.data)
        })

        axios.post<Image[]>(`${process.env.GATSBY_API_ENDPOINT}/getimagesbyproid`, {
            proid: id
        }).then(results => {
            console.log(results.data)

            // Build an arary of ReactImageGalleryItem type
            let i: ReactImageGalleryItem[] = [];
            results.data.map(image => {
                const imageName = `${process.env.GATSBY_API_ENDPOINT}/images/${image.image_name}`
                i.push({
                    original: imageName,
                    thumbnail: imageName
                })
            })
            setImages(i)
        })
    }, [])

    return (
        <div>
            <MainNavbar></MainNavbar>

            {/* Top banner */}
            <div className="flex w-4/5 m-auto py-3">
                <div className="w-1/2">
                    <p className="text-ultrared text-xl">{pro.fullname}</p>
                    <p className="text-white">{pro.profession}</p>
                </div>
                <div className="w-1/2 flex justify-end">
                    <button className="border border-saffron text-saffron px-2 py-1 flex items-center">Book Now <FaCalendarAlt className="inline ml-2"></FaCalendarAlt></button>
                </div>
            </div>

            {/* Gallery */}
            <ImageGallery items={images} showThumbnails={true} additionalClass={'w-72 m-auto'} showPlayButton={false} />

            {/* About section */}
            <div className="bg-black w-2/3 my-5 mx-auto p-3">
                <p className="text-ultrared text-xl">About Me</p>
                <pre className="text-white whitespace-pre-wrap">{pro.bio}</pre>
            </div>
        </div>
    )
}
