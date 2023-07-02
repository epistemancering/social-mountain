import react from "react"
import {NavLink} from 'react-router-dom'
import AuthContext from "../store/authContext"
import logo from '../assets/dm-logo-white.svg'

const Header = () => {

    const styleActiveLink = ({ isActive }) => {
        return {
            color: isActive ? '#f57145' : ''
        }
    }
    let context = react.useContext(AuthContext)
    let links
    if (context.token) {
        links = <>
            <li>
                <NavLink style={styleActiveLink} to='profile'>Profile</NavLink>
            </li>
            <li>
                <NavLink style={styleActiveLink} to='form'>Add Post</NavLink>
            </li>
            <li>
                <button onClick = {function() {
                    context.logout(true)
                }}>
                    Logout
                </button>
            </li>
        </>
    } else {
        links = <>
            <li>
                <NavLink style={styleActiveLink} to='auth'>Login or Sign Up</NavLink>
            </li>
        </>
    }
    return (
        <header className='header flex-row'>
            <div className='flex-row'>
                <img src={logo} alt='dm-logo' className='logo'/>
                <h2>Social Mountain</h2>
            </div>
            <nav>
                <ul className='main-nav'>
                    <li>
                        <NavLink style={styleActiveLink} to='/'>Home</NavLink>
                    </li>
                    {links}
                </ul>
            </nav>
        </header>
    )
}

export default Header