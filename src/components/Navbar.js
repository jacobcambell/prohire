import { Link } from "react-router-dom";

const Navbar = () => {
    return ( 
        <div className="navbar">
            <Link to="/" className="logo">ProHire</Link>
        </div>
     );
}
 
export default Navbar;