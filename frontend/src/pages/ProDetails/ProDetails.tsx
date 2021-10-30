import { useParams } from "react-router";
import Gallery from "../../components/Gallery";
import MainNavbar from "../../components/MainNavbar/MainNavbar";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import styles from './ProDetails.module.scss';

const ProDetails = () => {
    const { slug }: { slug: string } = useParams();

    const [name, setName] = useState('');
    const [profession, setProfession] = useState('');
    const [location, setLocation] = useState('');
    const [bio, setBio] = useState('');
    const [id, setId] = useState('');

    const [images, setImages] = useState<string[]>();

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
        <div className="bg-dark">
            <MainNavbar></MainNavbar>

            <div className="container bg-dark">
                <div className="row">
                    <div className="col-12">
                        <p className="text-white mb-0">{name}</p>
                    </div>
                    <div className="col-12">
                        <p className="text-white mb-0">{profession} from {location}</p>
                    </div>
                    <div className="col-12">
                        <Link to="/" className="btn-primary d-block text-decoration-none p-2 text-center">Schedule Now</Link>
                    </div>
                </div>
            </div>

            {/* <Gallery images={images}></Gallery> */}

            {/* <div className={styles.bio}>
                <p className={styles.title}>About {name}</p>
                <p className={styles.bioContent}>{bio}</p>
            </div> */}
        </div>
    );
}

export default ProDetails;