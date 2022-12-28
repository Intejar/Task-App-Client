import { useQuery } from '@tanstack/react-query';
import { Button, Card, Checkbox, Dropdown, Label, Modal, Table, TextInput } from 'flowbite-react';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import EditModal from '../EditModal/EditModal';

const MyTask = () => {
    const [visible, setVisible] = useState(false)
    const [edit, setEdit] = useState(null)

    const { data: tasks = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['tasks'],
            queryFn: async () => {
                const res = await fetch('http://localhost:5000/task');
                const data = await res.json();
                return data
            }
        }
    )

    const handleComplete = (id) => {
        fetch(`http://localhost:5000/task/${id}`, {
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
                }
                else {
                    alert(data.message)
                }
            })
    }
    if (isLoading) {
        return <div className='flex justify-center items-center'><h1>loading..</h1></div>
    }

    const handleModal = (id) => {
        setVisible(true)
        setEdit(id)

    }
    const handleDelete = (id, name) => {
        const proceed = window.confirm(`Are you sure you want to delete ${name} task?`)
        if (proceed) {
            fetch(`http://localhost:5000/task/${id}`, {
                method: 'DELETE',
            })
                .then(res => res.json())
                .then(data => {
                    console.log(data)
                    if (data.deletedCount > 0) {
                        alert('task has been successfully deleted')
                        refetch()
                    }
                })
        }

    }
    return (
        <div className='mx-10 p-5'>
            <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
                {
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
                                        <Link onClick={()=> handleDelete(task._id, task.todo)}
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
                                    {task.status}
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
                }
                {
                    edit &&
                    <EditModal visible={visible} setVisible={setVisible} edit={edit} refetch={refetch}></EditModal>
                }
            </div>
        </div>
    );
};

export default MyTask;