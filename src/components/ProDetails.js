import { useParams } from "react-router";
import Gallery from "./Gallery";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const ProDetails = () => {
    const {slug} = useParams();    

    const [name, setName] = useState();
    const [profession, setProfession] = useState();
    const [location, setLocation] = useState();    
    const [bio, setBio] = useState();

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
        })
    }, [])
        

    return ( 
        <div className="prodetails">
            <div className="inforow">
                <p className="name">{name}</p>
                <p className="profession">{profession} from {location}</p>
                <Link to="/schedule" className="scheduleBtn">Schedule Now</Link>
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