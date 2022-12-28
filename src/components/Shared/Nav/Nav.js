import { Button, Navbar } from 'flowbite-react';
import React from 'react';
import { Link } from 'react-router-dom';

const Nav = () => {
    return (
        <Navbar
            fluid={true}
            rounded={true}
            className='bg-blue-200'
        >
            <Navbar.Brand href="https://flowbite.com/">
                <img
                    src="https://flowbite.com/docs/images/logo.svg"
                    className="mr-3 h-6 sm:h-9"
                    alt="Flowbite Logo"
                />
                <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
                    Task Manager
                </span>
            </Navbar.Brand>
            <div className="flex md:order-2">
                <Button>
                    Get started
                </Button>
                <Navbar.Toggle />
            </div>
            <Navbar.Collapse>
                <Link
                    to='/'
                >
                    Home
                </Link>
                <Link to='/myTask'>
                    My Task
                </Link>
                <Link to='/addTask'>
                    Add Task
                </Link>
                <Link to='/completedTask'>
                    Completed Task
                </Link>
                <Link to='/'>
                    Contact
                </Link>
            </Navbar.Collapse>
        </Navbar>
    );
};

export default Nav;