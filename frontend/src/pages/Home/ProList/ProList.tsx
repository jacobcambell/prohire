import { useEffect, useState } from "react";
import ProTile from "./ProTile/ProTile";
import axios from 'axios';

interface Pro {
    id: number;
    fullname: string;
    location_from: string;
    profession: string;
    slug: string;
}

const ProList = () => {
    const [pros, setPros] = useState<Pro[]>([]);

    useEffect(() => {
        axios.post<Pro[]>(`${process.env.REACT_APP_API_ENDPOINT}/get-all-pros`)
            .then(res => {
                setPros(res.data);
            })
    }, []);

    return (
        <div className="">
            {
                pros.length > 0 && pros.map((pro) => (
                    <div className="row">
                        <ProTile key={pro.id} fullname={pro.fullname} slug={pro.slug} image={`https://placeimg.com/250/250/people`}></ProTile>
                    </div>
                ))
            }
        </div>
    );
}

export default ProList;