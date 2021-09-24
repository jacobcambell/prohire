import GalleryImage from "../GalleryImage";
import styles from './Gallery.module.css';

const Gallery = ({images}) => {

    // images should be an array of strings
    return (
        <div className={styles.gallery}>
            {
                images &&
                images.map((image) => (
                    <GalleryImage image={image}></GalleryImage>
                ))
            }
        </div>
     );
}

export default Gallery;