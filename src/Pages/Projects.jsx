import React from 'react'
import Dashboard from '../Components/Dashboard'
import Navbar from '../Components/Navbar'
import Footer from '../Components/Footer'

const Projects = () => {
  return (
    <>
      <div className='flex'>
        <div>
            <Dashboard />
        </div>
        <div className='container flex flex-col justify-between'>
            <div>
                <Navbar />
                <div className='pt-10 px-5'>
                    Projects
                </div>
            </div>
            <div>
                <Footer />
            </div>
        </div>
      </div>
    </>
  )
}

export default Projects
