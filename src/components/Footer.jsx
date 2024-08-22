// Footer.jsx
import React from 'react'

const Footer = () => {
    return (
        <footer className='bg-slate-800 text-white w-full flex-shrink-0'>
            <div className="myContainer flex justify-between items-center px-4 py-5 h-14">
                <div className='logo font-bold text-2xl'>
                    <span className='text-green-500'>&lt;</span>
                    Pass
                    <span className='text-green-500'>OP/&gt;</span>
                </div>
                <div className='flex justify-center items-center gap-1'>
                    Made with 
                    <img src="icons/love.svg" alt="" />
                    by Abhijeet
                </div>
            </div>
        </footer>
    )
}

export default Footer
