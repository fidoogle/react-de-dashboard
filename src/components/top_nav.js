import React from 'react';
import { Link } from 'react-router-dom';

const TopNav = (props) => {
  return (
    <div className="navLinks">
      <div><a href="#"><img src="dummy" /></a></div>
      <div><a href="#"><img src="dummy" /></a></div>
      <div style={{ paddingTop: '18px' }}><Link to="/"><img src="https://storage.googleapis.com/dedashboard/images/link-de-dashboard.png" /></Link></div>
      <div><a href="#"><img src="dummy" /></a></div>
      <div><a href="#"><img src="dummy" /></a></div>
    </div>
  );
};

export default TopNav;