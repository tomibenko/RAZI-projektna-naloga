import { UserContext } from "../userContext";
import { Link } from 'react-router-dom';
import '../App.css';

function Header(props) {
    return (
        <header className="App-header">
            <h1>{props.title}</h1>
            <nav className="navbar">
                <Link to='/'>Home</Link>
                <UserContext.Consumer>
                    {context => (
                        context.user ?
                            <>
                                <li><Link to="/profile">Profile</Link> </li>
                                <li><Link to="/logout">Logout</Link></li>
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