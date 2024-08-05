import React from 'react'

const Navbar = () => {
  return (
    // Navigation bar container with flexbox styling and background color
    <nav className='flex justify-around bg-cyan-800 text-white py-4'>
      <div className="logo">
        {/* Logo section */}
        <span className='font-bold text-2xl mx-8'>To-Dozz</span>
      </div>
      <ul className="flex gap-8 mx-9">
        {/* NAvigation Links */}
        <li className='cursor-pointer text-lg hover:font-bold transition-all'>Home</li>
        <li className='cursor-pointer text-lg hover:font-bold transition-all'>Your Tasks</li>
      </ul>
    </nav>
  )
}

export default Navbar
