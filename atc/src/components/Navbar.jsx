import '../css/Navbar.css';
import { Link } from 'react-router-dom';

function Navbar() {
  return (
    <nav className='navbar'>
      <Link to="/" className='logo'>
        <div className='logo-image'>
          <img src='/atclogo.png' alt="ATC Logo" className='atc-logo' />
        </div>
        <div className='logo-title'>
          <p>atcideas</p>
        </div>
      </Link>

      <div className='contactus-button'>
        <Link to="/contact">
          <button className='contact-button'><span>Contact us</span></button>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
