import React, { useState , useEffect } from "react";
import { Chart as ChartJS, defaults } from "chart.js/auto";
import { Bar, Doughnut, Line } from "react-chartjs-2";
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
      console.log(err.message);
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

  // useEffect(function() {
  //   async function fetchPolicy() {
  //       const res = await fetch(`/get_policy_tree`);
  //       const dataPolicy = await res.json();
  //       await setDataPolicy(dataPolicy);
  //       console.log(dataPolicy);
  //   }
  //   fetchPolicy();
  // }, []);

  useEffect(() => {
    fetch("/get_policy_tree").then(
      res => res.json()
    ).then(
      dataPolicy => {
        setDataPolicy(dataPolicy)
        console.log(dataPolicy)
      }
    )
  }, [])
  


function Logo(){
  return <div className="logo-container"> 
  <img className="logo-image" src="/Assets/logo.png" alt="Logo" /> 
  </div>
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



function Navbar({data}){
  return (
      <div className="navbar">
        <ul>
          <button className = "navbar-button" onClick={() => setShowForm(true)}>Overlaps</button>
          <button className = "navbar-button" >Recovery Points</button>

          {/* {!errormsg && <ShowResults data={data}/>}
          {errormsg && <ErrorMessage message={errormsg}/>} */}
          
        </ul>
      </div>
    );
}


  return (
  <div>
<Logo />
<Navbar data={data} />
{ showForm && <OverlapsForm data={data} givenTime={givenTime} setGivenTime={setGivenTime} dataPolicy={dataPolicy} setDataPolicy={setDataPolicy} />}

  </div>
  )
}

export default App;