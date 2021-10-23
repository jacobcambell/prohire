import { Link } from "react-router-dom";
import styles from './ProTile.module.css';

const ProTile = ({ fullname, slug, image }) => {
    return (
        <div className="col-12 d-flex justify-content-center">
            <Link to={`/professionals/${slug}`} style={{ backgroundImage: `url(${image})` }} className={styles.protile}>
                <div className={styles.name}>
                    <p>{fullname}</p>
                </div>
            </Link>
        </div>
    );
}

export default ProTile;