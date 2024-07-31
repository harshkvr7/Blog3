import React,{useContext} from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from '../context/authContext';

const Navbar = () => {
  const {currentUser, logout} = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className="container">
        <div className="logo">
          <Link to="/" className='link'>
            <h1>Bloger</h1>
          </Link>
        </div>
        <div className="links">
          <span>{currentUser?.username}</span>
          {currentUser ? <span onClick={logout}>Logout</span> : <Link className="link" to="/login">Login</Link>}
          <span className='write'>
            <Link className='link' to="/write">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="none" viewBox="0 0 24 24" aria-label="Write"><path fill="currentColor" d="M14 4a.5.5 0 0 0 0-1zm7 6a.5.5 0 0 0-1 0zm-7-7H4v1h10zM3 4v16h1V4zm1 17h16v-1H4zm17-1V10h-1v10zm-1 1a1 1 0 0 0 1-1h-1zM3 20a1 1 0 0 0 1 1v-1zM4 3a1 1 0 0 0-1 1h1z"></path><path stroke="currentColor" d="m17.5 4.5-8.458 8.458a.25.25 0 0 0-.06.098l-.824 2.47a.25.25 0 0 0 .316.316l2.47-.823a.25.25 0 0 0 .098-.06L19.5 6.5m-2-2 2.323-2.323a.25.25 0 0 1 .354 0l1.646 1.646a.25.25 0 0 1 0 .354L19.5 6.5m-2-2 2 2"></path></svg>
            </Link>
          </span>
        </div>
      </div>

      <div className="container2">
          <Link className='link' to="/?cat=art">
            <h6>Art</h6>
          </Link>
          <Link className='link' to="/?cat=science">
            <h6>Science</h6>
          </Link>
          <Link className='link' to="/?cat=technology">
            <h6>Technology</h6>
          </Link>
          <Link className='link' to="/?cat=cinema">
            <h6>Cinema</h6>
          </Link>
          <Link className='link' to="/?cat=design">
            <h6>Design</h6>
          </Link>
          <Link className='link' to="/?cat=food">
            <h6>Food</h6>
          </Link>
        </div>  
    </div>
  )
}

export default Navbar;