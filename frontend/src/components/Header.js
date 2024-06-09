import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import '../App.css';
import logo from "../images/logo.png";

function Header(props) {
    return (
        <header className="App-header">
            <img src={logo} alt="Company logo" className="logo"></img>
            <nav className="navbar">
                <Link to='/'>Home</Link>
                <UserContext.Consumer>
                    {context => (
                        context.user ?
                            <>
                                <li><Link to="/profile">Profile</Link> </li>
                                <li><Link to="/History">History</Link> </li>
                                <li><Link to="/logout">Logout</Link></li>
                                <li><Link to="/add-owner">Dodaj Uporabnika</Link></li>
                                <li><Link to="/add-mailbox">Dodaj paketnik</Link></li>

                            </>
                            :
                            <>
                                <li><Link to="/login">Login</Link></li>
                                <li><Link to="/register">Register</Link></li>
                            </>
                    )}
                </UserContext.Consumer>
            </nav>
        </header>
    );
}
export default Header;