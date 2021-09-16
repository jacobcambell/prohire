const GalleryImage = ({image}) => {
    return ( 
        <div className="galleryimage" style={{backgroundImage: `url(${image})`}}>            
        </div>
     );
}
 
export default GalleryImage;