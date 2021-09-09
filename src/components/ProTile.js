import { Link } from "react-router-dom";

const ProTile = ({name, slug, image}) => {
    return ( 
        <Link to={`/professionals/${slug}`} className="protile" style={{backgroundImage: `url(${image})`}}>
            <div className="name">
                <p>{name}</p>
            </div>
        </Link>
     );
}
 
export default ProTile;