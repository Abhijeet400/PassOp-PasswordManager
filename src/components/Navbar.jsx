import React from 'react'

const Navbar = () => {
  return (
    <nav className=' bg-slate-800 text-white'>
      <div className="myContainer flex justify-between items-center px-4 py-5 h-14">
        <div className='logo font-bold text-2xl'>
          <span className='text-green-500'>&lt;</span>
          Pass
          <span className='text-green-500'>OP/&gt;</span>
        </div>
        <a href="https://github.com/Abhijeet400/PassOp-PasswordManager" target='_blank'>
          <button className='text-white flex items-center gap-2 py-1 px-4 rounded-full hover:bg-slate-700'>
            <img src="icons/github.svg" alt="" width={40}/>
            GitHub Repo
          </button>
        </a>
      </div>
    </nav>
  )
}

export default Navbar
