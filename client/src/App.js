import React, { useState , useEffect } from "react";
import "./App.css";

function App(){
  const [showForm, setShowForm] = useState(false);

  const [data, setData] = useState([{}]);

  useEffect(() => {
    fetch("/get_policy_tree").then(
      res => res.json()
    ).then(
      data => {
        setData(data)
        console.log(data)
      }
    )
  }, [])


function Logo(){
  return <div className="logo-container"> 
  <img className="logo-image" src="/Assets/logo.png" alt="Logo" /> 
  </div>
}

function OverlapsForm(props){
  const [selectedPolicies, setSelectedPolicies] = useState("");
  const [givenTime, setGivenTime] = useState("");
  const [availablePolicies, setAvailablePolicies] = useState([
    { id: "policy1", name: "Policy 1" },
    { id: "policy2", name: "Policy 2" },
    { id: "policy3", name: "Policy 3" },
  ]);

  const handleSubmit = (event) =>{
    const selectedPolicyId = event.target.value;
    setSelectedPolicies([...selectedPolicies, selectedPolicyId]);
    setAvailablePolicies(
      availablePolicies.filter((policy) => policy.id !== selectedPolicyId)
    );
  };

  const handlePolicyChange = (event) => {
    const selectedPolicyId = event.target.value;
    setSelectedPolicies([...selectedPolicies, selectedPolicyId]);
    setAvailablePolicies(
      availablePolicies.filter((policy) => policy.id !== selectedPolicyId)
    );
  };

  return ( <div className="overlaps-form-container">
    <form className="overlaps-form" onSubmit={handleSubmit}>
      <h2>Select Policies</h2>
      <div className="form-group">
        <label htmlFor="policies">Select Policies:</label>
        <select
          id="policies"
          value=""
          onChange={handlePolicyChange}
        >
          <option value="">Select</option>
          {availablePolicies.map((policy) => (
            <option key={policy.id} value={policy.id}>
              {policy.name}
            </option>
          ))}
        </select>
      </div>
      <div className="form-group">
        <label htmlFor="givenTime">Given Time:</label>
        <input
          type="text"
          id="givenTime"
          value={givenTime}
          onChange={(e) => setGivenTime(e.target.value)}
          placeholder="Enter given time..."
        />
      </div>
      <button type="submit">Submit</button>
    </form>
    </div>
  );
}

function Navbar(){
  return (
      <div className="navbar">
        <ul>
          <button className = "navbar-button" onClick={() => setShowForm(true)}>Overlaps</button>
          <button className = "navbar-button" >Recovery Points</button>
          
        </ul>
      </div>
    );
}


  return (
  <div>
<Logo />
<Navbar />
{ showForm && <OverlapsForm />}

  </div>
  )
}

export default App;