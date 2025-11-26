import {Link} from "react-router-dom";
import"./Navbar.css";


export default function Navbar(){
    return (
        <nav className="navbar">
            <ul className="nav-links">
                <li><Link to="/">Home</Link></li>
                <li><Link to="/About">About</Link></li>
                <li><Link to="/Visualizer">Visualizer</Link></li>
            </ul>
        </nav>

    )
}