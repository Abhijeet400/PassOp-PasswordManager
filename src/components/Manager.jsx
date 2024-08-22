import React from 'react'
import { useRef, useState, useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { v4 as uuid4 } from 'uuid'

const Manager = () => {

    const ref = useRef()
    const passwordRef = useRef()
    const usernameRef = useRef()
    const [form, setForm] = useState({ site: "", username: "", password: "" })
    const [passwordArray, setPasswordArray] = useState([])

    useEffect(() => {
        let passwords = localStorage.getItem("passwords")
        if (passwords) {
            setPasswordArray(JSON.parse(passwords))
        }
    }, [])

    const handleKeyDown = (e) => {
        if (e.key === "Enter") {
            switch (e.target.name) {
                case "site":
                    usernameRef.current.focus();
                    break;
                case 'username':
                    passwordRef.current.focus();
                    break;
                case 'password':
                    savePassword();
                    break;
                default:
                    break;
            }
        }
    }

    const showPassword = () => {
        passwordRef.current.type = "text"
        if (ref.current.src.endsWith('icons/open.svg')) {
            passwordRef.current.type = "text"
            ref.current.src = "icons/hide.svg"
        }
        else {
            ref.current.src = "icons/open.svg"
            passwordRef.current.type = "password"
        }
    }

    const savePassword = () => {
        if (!form.site || !form.username || !form.password) {
            toast('Field(s) empty!', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
                progressStyle: { backgroundColor: '#4ade80' },
            });
        }
        else {
            setPasswordArray([...passwordArray, { ...form, id: uuid4() }])
            localStorage.setItem("passwords", JSON.stringify([...passwordArray, { ...form, id: uuid4() }]))
            console.log([...passwordArray, form])
            setForm({ site: "", username: "", password: "" })
            toast('Password saved', {
                position: "top-right",
                autoClose: 5000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "light",
            });
        }
    }

    const deletePassword = (id) => {
        let c = confirm("Do you want to delete this password?")
        if (c) {
            setPasswordArray(passwordArray.filter(item => item.id !== id))
            localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item => item.id !== id)))
        }
        toast('Password deleted', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
        });
    }

    const editPassword = (id) => {
        setForm(passwordArray.filter(item => item.id === id)[0])
        setPasswordArray(passwordArray.filter(item => item.id !== id))
    }

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value })
    }

    const copyText = (text) => {
        toast('Copied to clipboard!', {
            position: "top-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
            progressStyle: { backgroundColor: '#4ade80' },
        });
        navigator.clipboard.writeText(text)
    }
    return (
        <>
            <ToastContainer
                position="top-right"
                autoClose={5000} // Set the auto-close duration (in milliseconds)
                hideProgressBar={false} // Whether to hide the progress bar
                newestOnTop={false} // Whether to place new toasts on top of old ones
                closeOnClick // Whether clicking on the toast closes it
                rtl={false} // Right-to-left layout support
                pauseOnFocusLoss // Pause toast auto-close when the window loses focus
                draggable // Allow toasts to be dragged
                pauseOnHover // Pause toast auto-close when hovered
                theme="light" // Set the theme for the toasts
            />
                <div className="absolute inset-0 -z-10 h-full w-full bg-green-50 bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-green-400 opacity-20 blur-[100px]"></div></div>

            <div className="md:myContainer p-2 md:p-0">
                <div className='logo font-bold text-2xl text-center pt-5'>
                    <span className='text-green-500'>&lt;</span>Pass<span className='text-green-500'>OP/&gt;</span>
                </div>

                <p className='text-green-600 text-center'>Your own password manager</p>

                <div className="flex flex-col p-4 gap-4 items-center">
                    <form onKeyDown={handleKeyDown} className="flex flex-col p-4 gap-4 items-center">
                        <input value={form.site} onChange={handleChange} placeholder='Enter website URL' className='rounded-full border border-green-500 w-full text-black py-1 px-4' type="text" name='site' id='siteId' />

                        <div className="input flex md:flex-row flex-col w-full gap-8 justify-between">
                            <input value={form.username} onChange={handleChange} placeholder='Enter Username' className='rounded-full border border-green-500 w-full text-black py-1 px-4' type="text" name='username' id='usernameId' ref={usernameRef} />

                            <div className="relative w-full">
                                <input value={form.password} onChange={handleChange} placeholder='Enter Password' className='rounded-full border border-green-500 w-full text-black py-1 px-4' type="password" name='password' id='passwordId' ref={passwordRef} />

                                <span className='absolute right-[1px] top-[1px] cursor-pointer' onClick={showPassword}>
                                    <img ref={ref} src="/icons/open.svg" alt="show" className='p-1' />
                                </span>
                            </div>
                        </div>

                        <button onClick={savePassword} className='flex justify-center gap-2 items-center bg-green-400 rounded-full px-6 py-2 w-fit hover:bg-green-300 border border-green-900 cursor-pointer' disabled={!form.site || !form.username || !form.password}>
                            <lord-icon
                                src="https://cdn.lordicon.com/jgnvfzqg.json"
                                trigger="hover">
                            </lord-icon>
                            Save
                        </button>
                    </form>
                </div>

                <div className="passwords">
                    <h2 className='font-bold text-green-600 text-2xl text-center py-4'>Your Passwords</h2>
                    {passwordArray.length === 0 && <div className='text-center font-bold'>No passwords to show!</div>}
                    {passwordArray.length != 0 && <div className='overflow-x-auto'><table className="table-auto w-full overflow-hidden rounded-md mb-10">
                        <thead className='bg-green-700 text-white'>
                            <tr>
                                <th className='py-1'>Site</th>
                                <th className='py-1'>Username</th>
                                <th className='py-1'>Passwords</th>
                                <th className='py-1'>Actions</th>
                            </tr>
                        </thead>
                        <tbody className='bg-green-200'>
                            {passwordArray.map((item, index) => {
                                return <tr key={index}>
                                    <td className='text-center py-1 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span><a href={item.site} target='_blank'>{item.site}</a></span>
                                            <div className="cursor-pointer size-7 hidden md:block" onClick={() => copyText(item.site)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-1 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.username}</span>
                                            <div className="cursor-pointer size-7 hidden md:block" onClick={() => copyText(item.username)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-1 border border-white'>
                                        <div className="flex items-center justify-center">
                                            <span>{item.password}</span>
                                            <div className="cursor-pointer size-7 hidden md:block" onClick={() => copyText(item.password)}>
                                                <lord-icon style={{ "width": "25px", "height": "25px", "paddingTop": "4px" }} src="https://cdn.lordicon.com/iykgtsbt.json" trigger="hover"></lord-icon>
                                            </div>
                                        </div>
                                    </td>
                                    <td className='text-center py-1 border border-white'>
                                        <span className='cursor-pointer mx-1' onClick={() => editPassword(item.id)}>
                                            <lord-icon src="https://cdn.lordicon.com/gwlusjdu.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                        </span>
                                        <span className='cursor-pointer mx-1' onClick={() => deletePassword(item.id)}>
                                            <lord-icon src="https://cdn.lordicon.com/skkahier.json" trigger="hover" style={{ "width": "25px", "height": "25px" }}></lord-icon>
                                        </span>
                                    </td>
                                </tr>
                            })}
                        </tbody>
                    </table></div>}
                </div>
            </div >
        </>
    )
}

export default Manager

// Continue from 1:28:05 exactly