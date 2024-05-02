import React, { useState , useEffect } from "react";
import "./App.css";
import Navbar from "./components/Navbar";
import Logo from "./components/Logo";
import CreatePolicy from "./components/CreatePolicy";
import OverlapsForm from "./components/OverlapsForm";



function App(){
  const [showForm, setShowForm] = useState(true);
  const [errormsg,setError]=useState("");
  const [givenTime, setGivenTime] = useState("");
  const[showComp,setShowComp]=useState(false);
  const [data, setData] = useState([]);
  const [dataPolicy, setDataPolicy] = useState([]);

  //Effects
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
            errormsg={errormsg}
          />
        )}
      </div>
    </>
  )
}

export default App;