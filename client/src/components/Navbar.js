import React, { useState } from 'react';
import { Link } from 'react-router-dom';

const Navbar = ({ isAuthenticated, onLogout }) => {
  isAuthenticated = true
  const [dropDown, setdropDown] = useState(false);

  const handleProfileClick = () => {
    // Toggle the dropdown menu
    setdropDown((prevState) => !prevState);
  };

  const handleLogoutClick = () => {
    // Handle logout action
    onLogout();
    setdropDown(false);
  };

  return (
    <div
      className="navbar"
      style={{
        display: 'flex',
        justifyContent: 'space-between',
        alignItems: 'center',
        height: '80px',
        padding: '5px 15px', // Decreased padding for the navbar
        backgroundColor: '#f8f9fa',
        borderBottom: '2px solid #ddd',
      }}
    >
      {/* Navbar Logo */}
      <div
        style={{
          marginLeft: '40px',
          height: '80px', // Adjust the height to make the logo smaller
          width: '100px', // Adjust the width to make the logo smaller
          overflow: 'hidden',
        }}
      >
        <img
          alt="hpe logo"
          src="https://upload.wikimedia.org/wikipedia/commons/4/46/Hewlett_Packard_Enterprise_logo.svg"
          style={{
            height: '100%',
            width: '100%',
            objectFit: 'contain',
          }}
        />
      </div>

      {/* Navbar Links */}
      <ul style={{
        display: 'flex',
        listStyle: 'none',
        margin: 0,
        padding: 0,
        flexGrow: 1, // Allow the ul element to grow and take up the space between the logo and user profile
        justifyContent: 'flex-end', // Align the links to the right
      }}>
        <li style={{ marginTop: '5px' }}> {/* Adjust margin for better alignment */}
          <Link
            to="/"
            className="navbar-link"
            style={{
              color: '#007bff',
              padding: '5px 10px',
              margin: '0 5px',
              borderRadius: '5px',
              fontWeight: 'bold',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#0056b3';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#007bff';
            }}
          >
            Create Policy
          </Link>
        </li>
        <li style={{ marginTop: '5px' }}> {/* Adjust margin for better alignment */}
          <Link
            to="/dashboard"
            className="navbar-link"
            style={{
              color: '#28a745',
              padding: '5px 10px',
              margin: '0 5px',
              borderRadius: '5px',
              fontWeight: 'bold',
              textDecoration: 'none',
              cursor: 'pointer',
              transition: 'background-color 0.3s',
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#1e7e34';
              e.target.style.color = '#fff';
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = 'transparent';
              e.target.style.color = '#28a745';
            }}
          >
            Projection Run
          </Link>
        </li>
        {/* User Profile */}
        <li style={{ position: 'relative', marginLeft: '20px' }}> {/* Add margin left to separate from links */}
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer',
              padding: '5px 10px', // Adjust padding for smaller user profile section
              borderRadius: '5px',
              fontWeight: 'bold',
              transition: 'background-color 0.3s',
            }}
            onClick={handleProfileClick}
          >
            <img
              src="https://images.rawpixel.com/image_png_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDIzLTAxL3JtNjA5LXNvbGlkaWNvbi13LTAwMi1wLnBuZw.png"
              alt="User Avatar"
              style={{
                width: '25px', // Adjust size of user avatar image
                height: '25px', // Adjust size of user avatar image
                borderRadius: '50%',
                marginRight: '13px',
              }}
            />
            {/* <span style={{ color: '#000' }}>Profile</span> */}
          </div>
          {/* Dropdown Menu */}
          {dropDown && (
            <ul
              style={{
                position: 'absolute',
                top: '35px',
                right: '0',
                listStyle: 'none',
                margin: 0,
                padding: '10px',
                backgroundColor: '#fff',
                boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
                zIndex: 1000,
              }}
            >
              {isAuthenticated ? (
                <>
                  <li>
                    <Link 
                      to={'/userProfile'}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        textDecoration: 'none',
                        color: '#000',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={handleLogoutClick}
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        border: 'none',
                        backgroundColor: 'transparent',
                        color: '#000',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li>
                    <Link
                      to="/login"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        textDecoration: 'none',
                        color: '#000',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      Login
                    </Link>
                  </li>
                  <li>
                    <Link
                      to="/register"
                      style={{
                        display: 'block',
                        width: '100%',
                        padding: '10px',
                        textDecoration: 'none',
                        color: '#000',
                        cursor: 'pointer',
                        textAlign: 'left',
                      }}
                    >
                      Register
                    </Link>
                  </li>
                </>
              )}
            </ul>
          )}
        </li>
      </ul>
    </div>
  );
};

export default Navbar;
