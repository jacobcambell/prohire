import { useParams } from "react-router";
import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProDetails = () => {
    const {slug} = useParams();    

    const [name, setName] = useState('Alex Jones');
    const [profession, setProfession] = useState('Plumber from Salt Lake City, Utah');
    const [images, setImages] = useState();
    const [bio, setBio] = useState('This is my bio. It\'s really cool ');

    useEffect(() => {
        // Load data for this professional        
        setImages([
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people',
            'https://placeimg.com/250/250/people'        
        ]);
    }, [])
        

    return ( 
        <div className="prodetails">
            <div className="inforow">
                <p className="name">{name}</p>
                <p className="profession">{profession}</p>
                <Link to="/schedule" className="schedule">Schedule Now</Link>
            </div>

            <Gallery images={images}></Gallery>

            <div className="bio">
                <p className="title">About {name}</p>
                <p className="bioContent">{bio}</p>
            </div>
        </div>
     );
}
 
export default ProDetails;