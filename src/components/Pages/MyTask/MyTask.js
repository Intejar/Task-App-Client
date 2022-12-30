import { useQuery } from '@tanstack/react-query';
import { Button, Card, Checkbox, Dropdown, Label, Modal, Table, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import EditModal from '../EditModal/EditModal';
import { FaTrashAlt, FaCircle } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import DeleteModal from '../../DeleteModal/DeleteModal';
import { ClimbingBoxLoader } from 'react-spinners';
import { TabTitle } from '../../DynamicTitle/DynamicTitle';



const MyTask = () => {
    TabTitle('My Task-Task App')
    const [visible, setVisible] = useState(false)
    const [visibleDlt, setVisibleDlt] = useState(false)
    const [edit, setEdit] = useState(null)
    const [dlt, setDlt] = useState(null)
    const navigate = useNavigate()
    const { user } = useContext(AuthContext)
    // const crntUserMail = user.email 
    const { data: tasks = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['tasks'],
            queryFn: async () => {
                if (user.email) {
                    const res = await fetch(`https://task-app-server-iota.vercel.app/task?email=${user.email}`);
                    const data = await res.json();
                    return data
                }

            }
        }
    )
    const handleTask = event => {
        event.preventDefault()
        const form = event.target;
        const task = form.task.value;
        console.log(task)
        if (user) {
            const data = {
                todo: task,
                status: 'incomplete',
                email: user.email,
                check:[]
            }
            fetch('https://task-app-server-iota.vercel.app/task', {
                method: 'POST',
                headers: {
                    'content-type': 'application/json',
                },
                body: JSON.stringify(data)
            })
                .then(res => res.json())
                .then(data => {
                    form.reset()
                    console.log(data)
                    toast.success('your task added successfully')
                    refetch()
                })
        }
        else {
            navigate('/login')
        }


    }

    const handleComplete = (id) => {
        fetch(`https://task-app-server-iota.vercel.app/task/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "completed" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    // alert('yahoo your task completed successfully')
                    refetch()
                    navigate('/completedTask')
                }
                else {
                    alert(data.message)
                }
            })
    }
    if(isLoading){
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    const handleModal = (id) => {
        setVisible(true)
        setEdit(id)

    }
    const handleDelete = (id) => {
        setVisibleDlt(true)
        setDlt(id)
    }

    return (
        <div className=''>
            <div className='mt-10'>
                <h1 className='text-3xl text-center font-bold text-blue-400 my-5'>Add Your Task Here</h1>
                <form onSubmit={handleTask} className='flex justify-center'>
                    <input name='task' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 text-center" placeholder="your task here" required></input>
                    <input type="submit" hidden />
                </form>
            </div>
            <div className='mx-10  p-5'>
                {
                    user?.uid ?
                        <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                            {
                                tasks.length > 0 ?

                                    tasks.map(task =>
                                        <Card key={task._id} visible={visible} setVisible={setVisible}>
                                            <div className="flex justify-end px-4 pt-4">
                                                <Dropdown
                                                    inline={true}
                                                    label=""
                                                >
                                                    <Dropdown.Item>
                                                        <Link onClick={() => handleModal(task._id)}
                                                            href="#"
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Edit
                                                        </Link>

                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Link
                                                            href="#"
                                                            className="block py-2 px-4 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Export Data
                                                        </Link>
                                                    </Dropdown.Item>
                                                    <Dropdown.Item>
                                                        <Link onClick={() => handleDelete(task._id)}
                                                            href="#"
                                                            className="block py-2 px-4 text-sm text-red-600 hover:bg-gray-100 dark:text-gray-200 dark:hover:bg-gray-600 dark:hover:text-white"
                                                        >
                                                            Delete
                                                        </Link>
                                                    </Dropdown.Item>
                                                </Dropdown>
                                            </div>
                                            <div className="flex flex-col items-center pb-10">
                                                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                                                    {task.todo}
                                                </h5>
                                                <span className="text-sm text-gray-500 dark:text-gray-400">
                                                    <div className='flex items-center gap-1'>
                                                        <FaCircle className='text-xs text-red-500'></FaCircle>{task.status}
                                                    </div>
                                                </span>
                                                <div className="mt-4 flex space-x-3 lg:mt-6">
                                                    <Link onClick={() => handleComplete(task._id)}
                                                        href=""
                                                        className="inline-flex items-center rounded-lg bg-blue-700 py-2 px-4 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                        <span>completed</span>
                                                    </Link>
                                                    <Link
                                                        href=""
                                                        className="inline-flex items-center rounded-lg border border-gray-300 bg-white py-2 px-4 text-center text-sm font-medium text-gray-900 hover:bg-gray-100 focus:outline-none focus:ring-4 focus:ring-gray-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white dark:hover:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-700"
                                                    >
                                                        details
                                                    </Link>
                                                </div>
                                            </div>
                                        </Card>
                                    )
                                    :
                                    <div className='col-span-3'>
                                        <div className='flex justify-center text-2xl font-bold text-gray-500'><h1>No Task Added</h1></div>
                                    </div>
                            }
                            {
                                edit &&
                                <EditModal visible={visible} setVisible={setVisible} edit={edit} refetch={refetch}></EditModal>
                            }
                            {
                                dlt &&
                                <DeleteModal visibleDlt={visibleDlt} setVisibleDlt={setVisibleDlt} dlt={dlt} refetch={refetch}></DeleteModal>
                            }
                        </div>
                        :
                        <div className='flex justify-center text-2xl font-bold text-gray-500'><h1>No Task Added</h1></div>
                }
            </div>
        </div>
    );
};

export default MyTask;