import React, { useState , useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Line } from "react-chartjs-2";
import { Scatter } from 'react-chartjs-2';
import {hierarchy,linkHorizontal,tree, json,select} from "d3";
import "./App.css";
defaults.maintainAspectRatio = false;
defaults.responsive = true;

defaults.plugins.title.display = true;
defaults.plugins.title.align = "start";
defaults.plugins.title.font.size = 20;
defaults.plugins.title.color = "black";




function App(){
  const [showForm, setShowForm] = useState(true);
  const [errormsg,setError]=useState("");
  const [givenTime, setGivenTime] = useState("");
  const[showComp,setShowComp]=useState(false);
 


  const [data, setData] = useState([]);
  const [dataPolicy, setDataPolicy] = useState([]);

  useEffect(function() {
    async function fetchOverlaps() {
      try{
        setError("");
      const res= await fetch(`/get_overlaps?end_time=${givenTime}`);

      if(!res.ok) throw new Error("Something went wrong with fetching data.")
      const data= await res.json();
      setData(data);
      }catch(err){
      setError(err.message);
      }
      if(!givenTime.length){
        setData([]);
        setError("");
        return;
      }
    }
    fetchOverlaps();
  }, [givenTime]);


  useEffect(() => {
    fetch("/get_policy_tree").then(
      res => res.json()
    ).then(
      dataPolicy => {
        setDataPolicy(dataPolicy)
      }
    )
  }, [])
  

  function TreePolicy(){
    const svgRef = React.useRef(null);
    const width = document.body.clientWidth;
    const height = document.body.clientHeight - 100; // Adjusted for navbar height
    const treeLayout = tree().size([height, width]);
  
    React.useEffect(()=>{
      const svg = select(svgRef.current);
      // Clear svg content before adding new elements
      svg.selectAll("*").remove();
      // Create svg and add width and height
      svg.attr('width', width).attr('height', height);
  
      // ajax call to display in d3.js
      json('/data.json').then((data) => {
        const root = hierarchy(data);
        const paths = treeLayout(root).links();
        const pathGenerator = linkHorizontal()
          .x(d => d.y)
          .y(d => d.x);
  
        svg.selectAll("path").data(paths)
          .enter()
          .append("path")
          .attr("fill", "none")
          .attr("stroke", "#000")
          .attr("stroke-width", 1)
          .attr("d", pathGenerator);
        
        svg.selectAll("text")
          .data(root.descendants())
          .enter()
          .append("text")
          .attr("opacity", 0.5)
          .attr("color", "black")
          .attr("font-size", (d) => 3.5 - d.depth + "em")
          .attr("x", (d) => d.y)
          .attr("y", (d) => d.x)
          .text(d => d.data.type);
      });
    }, []);
  
    return <svg ref={svgRef} />
  }
  
function Logo(){
  return <div className="logo-container"> 
  <img className="logo-image" src="/Assets/logo.png" alt="Logo" /> 
  </div>
}

const messages = [
  "General",
  "Schedules",
  "Review"
];

function GetPolicyDetails(){
  // const [policy, setPolicy] = useState(false); 

  return ( <div className="overlaps-form-container">
    <form className="overlaps-form">
      <h2>Add Protection Policy</h2>
      <div className="form-group">
        <label htmlFor="policyName">Protection Policy Name</label>
        <input
          type="text"
          id="policyName"
          placeholder="Enter Policy Name"
        />
        <label htmlFor="Description">Description</label>
        <input
          type="text"
          id="description"
        />
        <div className="checkbox-section">
          <label>Options:</label>
          <div>
            <input type="checkbox" id="vmware" name="vmware" />
            <label htmlFor="vmware">VMware</label>
          </div>
          <div>
            <input type="checkbox" id="databaseLog" name="databaseLog" />
            <label htmlFor="databaseLog">DataBase Log</label>
          </div>
          <div>
            <input type="checkbox" id="aws" name="aws" />
            <label htmlFor="aws">AWS</label>
          </div>
          <div>
            <input type="checkbox" id="hpeArrayVolumes" name="hpeArrayVolumes" />
            <label htmlFor="hpeArrayVolumes">HPE Array Volumes</label>
          </div>
        </div>
      </div>
      
    </form>
     {/* <LineChart data={data} />  */}
    {/* <ScatterChart data={data} /> */}
    
    </div>
  );
}
function Review(){
  return (
    <div className="overlaps-form-container">
      <form className="overlaps-form">
      <h2>Review Policy </h2>

      </form>
    </div>
  );
}
function StepTwo() {
  const toggleScheduleForm = () => {
    const scheduleForm = document.getElementById("scheduleForm");
    scheduleForm.classList.toggle("open");
  };

  return (
    <div className="overlaps-form-container">
      <form className="overlaps-form">
        <h2>Add Protection Policy</h2>
        <div className="form-group">
          <p>HPE Array Volumes</p>
          <div className="schedule-container">
        <h2>Schedule</h2>
        <button onClick={toggleScheduleForm}>+ Add Schedule</button>
        <h2>Schedule</h2>
        <button onClick={toggleScheduleForm}>+ Add Schedule</button>
        <h2>Schedule</h2>
        <button onClick={toggleScheduleForm}>+ Add Schedule</button>
        <div className="schedule-form" id="scheduleForm">
         
        </div>
      </div>
        </div>
      </form>

     
    </div>
  );
}

function CreatePolicy({showComp,setShowComp}){
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

function OverlapsForm({data ,givenTime,setGivenTime,dataPolicy, setDataPolicy}){
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
    {/* <ScatterChart data={data} /> */}
    
    </div>
  );
}


function ScatterChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const datasets = [];

  data.forEach((entry) => {
    const occurrencesData = {
      label: `Schedules Involved ${entry.schedules_involved.join(', ')}`,
      data: [],
      fill: false,
      backgroundColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 0.6)`,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    };

    entry.occurrences.forEach((occurrence) => {
      occurrence.forEach((occurrenceStr) => {
        const values = occurrenceStr.split(' ');
        const dateTimeStr = values[0] + " " + values[1];
        const schedule = parseInt(values[2]);

        occurrencesData.data.push({
          x: dateTimeStr,
          y: schedule,
        });
      });
    });

    datasets.push(occurrencesData);
  });

  const chartData = {
    datasets: datasets,
  };

  const options = {
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          displayFormats: {
            day: 'MMM DD YYYY HH:mm',
          },
          tooltipFormat: 'MMM DD YYYY HH:mm',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date and Time',
        },
      }],
      yAxes: [{
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Schedule Involved',
        },
      }],
    },
  };

  return (
    <div className="dataCard revenueCard">
      <div className="dataCard customerCard">
        <Scatter data={chartData} options={options} />
      </div>
    </div>
  );
}

function LineChart({ data }) {
  if (!data || data.length === 0) {
    return <div>No data available</div>;
  }

  const datasets = [];

  data.forEach((entry) => {
    const occurrencesData = {
      label: `Schedules Involved ${entry.schedules_involved.join(', ')}`,
      data: [],
      fill: false,
      borderColor: `rgba(${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, ${Math.floor(Math.random() * 256)}, 1)`,
    };

    entry.occurrences.forEach((occurrence) => {
      occurrence.forEach((occurrenceStr) => {
        console.log(occurrenceStr);
        const values=occurrenceStr.split(' ');
        console.log(values);
        const dateTimeStr= values[0]+" "+values[1];
        const schedule= values[2];
        
  
        

        occurrencesData.data.push({
          x: dateTimeStr,
          y: parseInt(schedule),
        });
      });
    });

    datasets.push(occurrencesData);
  });

  const chartData = {
    datasets: datasets,
  };

  const options = {
    showLine:false,
    scales: {
      xAxes: [{
        type: 'time',
        time: {
          unit: 'day',
          displayFormats: {
            day: 'MMM DD YYYY HH:mm',
          },
          tooltipFormat: 'MMM DD YYYY HH:mm',
        },
        scaleLabel: {
          display: true,
          labelString: 'Date and Time',
        },
      }],
      yAxes: [{
        type: 'linear',
        scaleLabel: {
          display: true,
          labelString: 'Schedule Involved',
        },
      }],
    },
  };

  return (
    <div className="dataCard revenueCard">
      <div className="dataCard customerCard">
        <Line data={chartData} options={options} />
      </div>
    </div>
  );
}


function ErrorMessage({message}){
  return <p className="error">
    <span>{message}</span>
  </p>
}

function ShowResultsPolicy({ dataPolicy }) {
  const renderPolicy = (policy) => {
    return (
      <div key={policy.id}>
        <p>ID: {policy.id}</p>
        <p>Interval: {policy.interval}</p>
        <p>Start Time: {policy.startTime}</p>
        <p>Type: {policy.type}</p>
        {policy.children && (
          <div style={{ marginLeft: '20px' }}>
            {Array.isArray(policy.children) && policy.children.map(child => renderPolicy(child))}
          </div>
        )}
      </div>
    );
  };

  return (
    <div>
      {renderPolicy(dataPolicy)}
    </div>
  );
}



  
function ShowResults({ data }) {
  return (
    <div>
      {data.map((entry, index) => (
        <div key={index}>
          <h2>Schedules Involved: {entry.schedules_involved.join(', ')}</h2>
          <ul>
            {entry.occurrences.map((occurrence, subIndex) => (
              <li key={subIndex}>
                {occurrence.join(' to ')}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}



function Navbar({ data, setShowComp, setShowForm }) {
  const handleCreatePolicyClick = () => {
    setShowComp(true);
    setShowForm(false); // Hide the overlaps form if it's currently displayed
  };

  const handleOverlapsClick = () => {
    setShowComp(false); // Hide the create policy form if it's currently displayed
    setShowForm(true);
  };

  return (
    <div className="navbar">
      <ul>
        <button className="navbar-button" onClick={handleCreatePolicyClick}>
          Create Policy
        </button>
        <button className="navbar-button" onClick={handleOverlapsClick}>
          Overlaps
        </button>
        <button className="navbar-button">Recovery Points</button>
      </ul>
    </div>
  );
}



  return (
    <>
      <div>
        <Logo />
        <Navbar data={data} setShowComp={setShowComp} setShowForm={setShowForm} />
        {showComp && <CreatePolicy showComp={showComp} setShowComp={setShowComp} />}
        {showForm && (
          <OverlapsForm
            data={data}
            givenTime={givenTime}
            setGivenTime={setGivenTime}
            dataPolicy={dataPolicy}
            setDataPolicy={setDataPolicy}
          />
        )}
      </div>
    </>
  )
}

export default App;