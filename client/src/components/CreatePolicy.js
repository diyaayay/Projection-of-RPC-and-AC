import {React, useState} from "react";
import GetPolicyDetails from "./GetPolicyDetails";
import StepTwo from "./StepTwo";
import Review from "./Review";


const messages = [
    "General",
    "Schedules",
    "Review"
  ];
export default function CreatePolicy({showComp,setShowComp}){
    const [step,handleStep]=useState(1);
    
  
    function handleComp(){
      setShowComp(!showComp);
    }
    function handleNext(){
      if(step<3)
      handleStep(step+1)
    }
    function handlePrev(){
      if(step!==0)
      handleStep(step-1);
    }
    return <><div>
      <button onClick={handleComp}>Close</button>
    </div>
    <div>
      {showComp&&(
        <div className="steps">
          <div className="numbers">
          <div className={step>=1?"active":""}>1</div>
          <div className={step>=2?"active":""}>2</div>
          <div className={step>=3?"active":""}>2</div>
        </div>
        <p className="message"> 
    Step {step}:{messages[step-1]}
    {/* <div><GetPolicyDetails/></div> */}
    {step===1?<GetPolicyDetails/>:step===2?<StepTwo/>:<Review/>}</p>
    <div className="buttons">
      <button style={{backgroundColor : "#044015", color: "#fff" }} onClick={handlePrev}>Previous</button>
      <button style={{backgroundColor : "#044015", color: "#fff" }}
      onClick={handleNext}>Next</button>
    </div>
        </div>
      )}
    </div>
    </>
  }