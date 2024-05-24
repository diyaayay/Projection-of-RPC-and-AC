import React from 'react'
import Navbar from '../components/Navbar'
import CreatePolicy from '../components/CreatePolicy'
import '../App.css'

const Home = () => {
  return (
    <>
      <Navbar/>
      <div className="App">
        <CreatePolicy/>
      </div>
    </>
  )
}

export default Home