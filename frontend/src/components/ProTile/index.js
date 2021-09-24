import { Link } from "react-router-dom";
import styles from './ProTile.module.css';

const ProTile = ({fullname, slug, image}) => {
    return (
        <Link to={`/professionals/${slug}`} className={styles.protile} style={{backgroundImage: `url(${image})`}}>
            <div className={styles.name}>
                <p>{fullname}</p>
            </div>
        </Link>
     );
}

export default ProTile;