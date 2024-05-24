import React, { useEffect, useState } from 'react';
import styled from 'styled-components';

const Container = styled.div`
  .overlaps-form-container {
    background-color: #f9f9f9;
    padding: 20px;
    border-radius: 8px;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .overlaps-form {}

  h2 {
    font-size: 24px;
    margin-bottom: 20px;
    color: #333;
  }

  .form-group {
    margin-bottom: 20px;
  }

  label {
    font-size: 16px;
    color: #333;
  }

  input[type='text'] {
    width: 100%;
    padding: 10px;
    font-size: 16px;
    border: 1px solid #ccc;
    border-radius: 4px;
    margin-top: 5px;
    margin-bottom: 10px;
  }
`;

const RadioSection = styled.div`
  display: flex;
  flex-direction: column;
`;

const RadioItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 10px;
`;

const RadioInput = styled.input`
  margin-right: 8px;
`;

const GetPolicyDetails = ({ setTotal , total}) => {
  const [policyName, setName] = useState('');
  const [applicationType, setType] = useState('');

  useEffect(() => {
    setTotal(prevTotal => ({
      ...prevTotal,
      policyName,
      applicationType
    }));
  }, [policyName, applicationType, setTotal]);

  const handleNameChange = (e) => {
    setName(e.target.value);
  };

  const handleRadioChange = (e) => {
    setType(e.target.value);
    console.log(total)
  };

  
  return (
    <Container>
      <div className="overlaps-form-container">
        <form className="overlaps-form">
          <h2>Add Protection Policy</h2>
          <div className="form-group">
            <label htmlFor="policyName">Protection Policy Name</label>
            <input
              type="text"
              id="policyName"
              placeholder="Enter Policy Name"
              value={policyName}
              onChange={handleNameChange}
              required
            />
            <label htmlFor="Description">Description</label>
            <input type="text" id="description" />

            <RadioSection className="radio-section">
              <label>Options:</label>
              <RadioItem>
                <label htmlFor="vmware">VMWARE</label>
                <RadioInput
                  type="radio"
                  id="vmware"
                  name="option"
                  value="VMWARE"
                  onChange={handleRadioChange}
                  checked={applicationType === 'VMWARE'}
                />
              </RadioItem>
              <RadioItem>
                <label htmlFor="databaseLog">DataBase Log</label>
                <RadioInput
                  type="radio"
                  id="databaseLog"
                  name="option"
                  value="DataBase Log"
                  onChange={handleRadioChange}
                  checked={applicationType === 'DataBase Log'}
                />
              </RadioItem>
              <RadioItem>
                <label htmlFor="aws">AWS</label>
                <RadioInput
                  type="radio"
                  id="aws"
                  name="option"
                  value="AWS"
                  onChange={handleRadioChange}
                  checked={applicationType === 'AWS'}
                />
              </RadioItem>
              <RadioItem>
                <label htmlFor="hpeArrayVolumes">HPE Array Volumes</label>
                <RadioInput
                  type="radio"
                  id="hpeArrayVolumes"
                  name="option"
                  value="HPE Array Volumes"
                  onChange={handleRadioChange}
                  checked={applicationType === 'HPE Array Volumes'}
                />
              </RadioItem>
            </RadioSection>
          </div>
        </form>
      </div>
    </Container>
  );
};

export default GetPolicyDetails;