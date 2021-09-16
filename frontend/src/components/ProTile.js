import { Link } from "react-router-dom";

const ProTile = ({fullname, slug, image}) => {
    return ( 
        <Link to={`/professionals/${slug}`} className="protile" style={{backgroundImage: `url(${image})`}}>
            <div className="name">
                <p>{fullname}</p>
            </div>
        </Link>
     );
}
 
export default ProTile;