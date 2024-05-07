import React, { useState } from 'react';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const [date, setDate] = useState('');

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your form submission logic here
    console.log('Form submitted with date:', date);
  };

  return (
    <>
      <Navbar />
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          height: '80vh',
          padding: '20px',
          backgroundColor: '#f5f7fa',
        }}
      >
        <form
          onSubmit={handleSubmit}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: '#ffffff',
            padding: '30px',
            borderRadius: '15px',
            boxShadow: '0 6px 20px rgba(0, 0, 0, 0.1)',
            width: '350px',
          }}
        >
          <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>Projection Count</h3>
          <label htmlFor="date" style={{
            fontWeight: 'bold',
            marginBottom: '10px',
            fontSize: '16px',
            color: '#555',
          }}>
            Select Date:
          </label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            style={{
              padding: '12px',
              borderRadius: '8px',
              border: '1px solid #ccc',
              marginBottom: '20px',
              fontSize: '14px',
              width: '100%',
              boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
            }}
          />
          <button
            to="/dashboard"
            className="navbar-button"
            style={{
              height: '40px',
              border: 'none',
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
            Submit
          </button>
        </form>
      </div>
    </>
  );
};

export default Dashboard;
