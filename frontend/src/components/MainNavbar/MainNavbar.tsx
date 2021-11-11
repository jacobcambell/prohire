import { Link } from "react-router-dom";

const MainNavbar = () => {
    return (
        <div className="bg-black py-2 px-2">
            <Link to="/" className="text-white text-decoration-none fs-4">ProHire</Link>
        </div>
    );
}

export default MainNavbar;