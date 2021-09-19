import { useParams } from "react-router";
import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './css/ProDetails.module.css';

const ProDetails = () => {
    const {slug} = useParams();

    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [id, setId] = useState('');

    const [images, setImages] = useState();

    useEffect(() => {
        // Load data for this professional
        setImages([
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people'
        ]);

        fetch(`http://localhost:8080/prodetails?slug=${slug}`)
        .then(res => res.json())
        .then(data => {
            setName(data.fullname);
            setProfession(data.profession);
            setLocation(data.location_from);
            setBio(data.bio);
            setId(data.id);
        })
    }, [])


    return (
        <div className={styles.prodetails}>
            <div className={styles.inforow}>
                <p className={styles.name}>{name}</p>
                <p className={styles.profession}>{profession} from {location}</p>
                <Link to={`/schedule/${id}`} className={styles.scheduleBtn}>Schedule Now</Link>
            </div>

            <Gallery images={images}></Gallery>

            <div className={styles.bio}>
                <p className={styles.title}>About {name}</p>
                <p className={styles.bioContent}>{bio}</p>
            </div>
        </div>
     );
}

export default ProDetails;