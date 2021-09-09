import ProTile from "./ProTile";

const ProList = () => {
    // Get a list of all the professionals slugs and images

    const pros = [
        {name: 'Alex Jones', slug: 'alex-jones', image: 'https://placeimg.com/250/250/people'},
        {name: 'Michael Myers', slug: 'michael-myers', image: 'https://placeimg.com/250/250/people'}
    ];

    return ( 
        <div className="prolist">
            {
                pros && pros.map((pro) => (
                    <ProTile name={pro.name} slug={pro.slug} image={pro.image}></ProTile>
                ))
            }
        </div>
     );
}
 
export default ProList;