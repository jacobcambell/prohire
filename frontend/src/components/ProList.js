import { useEffect, useState } from "react";
import ProTile from "./ProTile";
import styles from './css/ProList.module.css';

const ProList = () => {
    // Get a list of all the professionals slugs and images

    const [pros, setPros] = useState();

    useEffect(() => {
        fetch('http://localhost:8080/getall')
        .then(res => res.json())
        .then(data => {
            setPros(data);
        })
    }, []);

    return (
        <div className={styles.prolist}>
            {
                pros && pros.map((pro) => (
                    <ProTile key={pro.id} fullname={pro.fullname} slug={pro.slug} image={`https://placeimg.com/250/250/people`}></ProTile>
                ))
            }
        </div>
     );
}

export default ProList;