import { Avatar, Button, Dropdown, Navbar } from 'flowbite-react';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import '../../Styles/Nav.css'
import logo from '../../Assets/logo/task manager.png'

const Nav = () => {
    const { user, logOut } = useContext(AuthContext)
    const [enabled, setEnabled] = useState(false);
    const navigate = useNavigate()
    const [theme, setTheme] = useState(null)

    useEffect(() => {
        if (window.matchMedia('{prefers-color-scheme : dark}').matches) {
            setTheme('dark');
        }
        else {
            setTheme('light')
        }
    }, [])
    useEffect(() => {
        if (theme === 'dark') {
            document.documentElement.classList.add("dark");
        }
        else {
            document.documentElement.classList.remove("dark")
        }
    }, [theme])

    const handleSwitch = () => {
        setTheme(theme === "dark" ? "light" : "dark")
    }
    const handleLogOut = () => {
        logOut()
            .then(() => {
                navigate('/')
            })
            .catch(err => {

            })

    }
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className='bg-blue-200'
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src={logo}
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Task Manager
                </span>
            </Navbar.Brand>
            {
                user?.uid ?
                    <div className="flex md:order-2">
                        <Dropdown
                            arrowIcon={false}
                            inline={true}
                            label={<Avatar alt="User settings" img={user.photoURL} rounded={true} />}
                        >
                            <Dropdown.Header>
                                <span className="block text-sm">
                                    {user.displayName}
                                </span>
                                <span className="block truncate text-sm font-medium">
                                    {user.email}
                                </span>
                            </Dropdown.Header>
                            <Dropdown.Item>
                                Settings
                            </Dropdown.Item>
                            <Dropdown.Divider />
                            <Dropdown.Item onClick={handleLogOut}>
                                Sign out
                            </Dropdown.Item>
                        </Dropdown>
                        <Navbar.Toggle />
                    </div>
                    :
                    <div className="flex md:order-2">
                        <Button className='buttonClr'>
                            <Link to='/signUp'>Get started</Link>
                        </Button>
                        <Navbar.Toggle />
                    </div>
            }

            <Navbar.Collapse>
                <Link to='/' className='font-bold dark:text-white'>
                    My Task
                </Link>
                <Link to='/addTask' className='font-bold dark:text-white'>
                    Add Task
                </Link>
                <Link to='/completedTask'className='font-bold dark:text-white'>
                    Completed Task
                </Link>
                <Link to='/media' className='font-bold dark:text-white'>
                    Media
                </Link>
                {
                    user?.uid ?
                        <Link to='/contact' className='font-bold dark:text-white'>
                            contact
                        </Link>
                        :
                        <Link to='/login' className='font-bold dark:text-white'>
                            SignIn
                        </Link>
                }
                <div className="relative flex flex-col items-center justify-center  overflow-hidden">
                    <div className="flex">
                        <label class="inline-flex relative items-center mr-5 cursor-pointer">
                            <input
                                type="checkbox"
                                className="sr-only peer"
                                
                                readOnly
                            />
                            <div
                                onClick={handleSwitch}
                                className="w-11 h-6 bg-gray-200 rounded-full peer  peer-focus:ring-green-300  peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"
                            ></div>
                            <span className="ml-2 text-sm font-bold text-gray-900 dark:text-white">
                                Dark Mode
                            </span>
                        </label>
                    </div>
                </div>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;