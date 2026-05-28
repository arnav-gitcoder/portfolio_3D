import React from 'react'
import Navbar from './sections/Navbar'
const App = () => {
  return (
    <div className='relative w-screen min-h-screen overflow-x-hidden'>
      <Navbar />
      <section id='home' className='min-h-screen'/>
      <section id='about' className='min-h-screen bg-gray-800'/>
      <section id='projects' className='min-h-screen bg-blue-600'/>
      <section id='contact' className='min-h-screen bg-green-400'/>
    </div>
  )
}

export default App