import GalleryImage from "./GalleryImage";

const Gallery = ({images}) => {

    // images should be an array of strings
    return ( 
        <div className="gallery">            
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