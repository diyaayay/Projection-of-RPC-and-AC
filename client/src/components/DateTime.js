import React from 'react';
import DateTime from 'react-datetime';
import 'react-datetime/css/react-datetime.css';

const DateTimeForm = ({ dateTime, handleDateTimeChange, handleSubmit, policyName, handlePolicyNameChange }) => {
    return (
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
                marginBottom: '80px',
                marginTop: '150px'
            }}
        >
            <h3 style={{ marginBottom: '20px', fontSize: '20px', color: '#333' }}>Projection Count</h3>
            
            <label htmlFor="policyName" style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#555', width: '100%' }}>
                Policy Name:
                <input
                    id='policyName'
                    type="text"
                    value={policyName}
                    onChange={(e) => handlePolicyNameChange(e.target.value)}
                    placeholder='Enter the policy name'
                    style={{
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginTop: '5px', 
                        fontSize: '14px',
                        width: '70%', // Decrease width here
                        maxWidth: '300px', // Set maximum width
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
                        marginLeft: '43px',
                        marginRight: '30px'
                    }}
                />
            </label>
            
            <label htmlFor="dateTime" style={{ fontWeight: 'bold', marginBottom: '8px', fontSize: '14px', color: '#555', width: '100%' }}>Select Date and Time:</label>
            <DateTime
                id="dateTime"
                value={dateTime}
                onChange={handleDateTimeChange}
                dateFormat="YYYY/MM/DD"
                timeFormat="HH:mm"
                inputProps={{
                    placeholder: 'YYYY/MM/DD HH:mm',
                    style: {
                        padding: '10px',
                        borderRadius: '5px',
                        border: '1px solid #ccc',
                        marginBottom: '20px',
                        fontSize: '14px',
                        width: '100%',
                        boxShadow: 'inset 0 2px 4px rgba(0, 0, 0, 0.1)'
                    },
                }}
            />
            
            <button
                type="submit"
                style={{
                    height: '40px',
                    border: 'none',
                    backgroundColor: '#28a745',
                    color: '#fff',
                    padding: '10px 20px',
                    margin: '0 5px',
                    borderRadius: '5px',
                    fontWeight: 'bold',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s',
                    fontSize: '14px',
                    width: '100%'
                }}
                onMouseOver={(e) => { e.target.style.backgroundColor = '#1e7e34'; }}
                onMouseOut={(e) => { e.target.style.backgroundColor = '#28a745'; }}
            >
                Submit
            </button>
        </form>
    );
};

export default DateTimeForm;
