import React from 'react';
import { Link } from 'react-router-dom';
import './navBar.css'

const Navbar: React.FC = () => {
  return (
    <nav className='navbar'>
      <div className='logo'>Hotel Booking</div>
      <ul className='navLinks'>
        <li className='navItem'>
          <Link to="/" className='navLink'>Home</Link>
        </li>
        <li className='navItem'>
          <Link to="/bookings" className='navLink'>My Bookings</Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
