import styles from './GalleryImage.module.css';

const GalleryImage = ({image}) => {
    return (
        <div className={styles.galleryimage} style={{backgroundImage: `url(${image})`}}>
        </div>
     );
}

export default GalleryImage;