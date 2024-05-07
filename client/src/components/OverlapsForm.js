import {React, useState} from "react";
import ErrorMessage from "./ErrorMessage";
import ShowResults from "./ShowResults";
import ShowResultsPolicy from "./ShowResultsPolicy";
import LineChart from "./LineChart";

export default function OverlapsForm({data ,givenTime,setGivenTime,dataPolicy, setDataPolicy, errormsg}){
    const [policy, setPolicy] = useState(false); 
  
    return ( <div className="overlaps-form-container">
      <form className="overlaps-form">
        <h2>Get OverLaps</h2>
        <div className="form-group">
          <label htmlFor="givenTime">Given Time:</label>
          <input
            type="text"
            id="givenTime"
            value={givenTime}
            onChange={(e)=>setGivenTime(e.target.value)}
            placeholder="Enter given time..."
          />
        </div>
        {!errormsg && <ShowResults data={data}/>}
            {errormsg && <ErrorMessage message={errormsg}/>}
  
            <div className="form-group">
            <label htmlFor="getPolicy">Get Policy:</label>
            <input
              type="checkbox"
              id="getPolicy"
              value={policy}
              onChange={()=>setPolicy(!policy)}
            />
          </div>
  
            {policy && <ShowResultsPolicy dataPolicy={dataPolicy}/>}
      </form>
       <LineChart data={data} /> 
      
      </div>
    );
  }