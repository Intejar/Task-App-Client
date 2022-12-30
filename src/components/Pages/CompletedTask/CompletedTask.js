import { useQuery } from '@tanstack/react-query';
import { Table, Textarea, Toast } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { FaTrashAlt, FaCircle } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import toast from 'react-hot-toast';
import DeleteModal from '../../DeleteModal/DeleteModal';
import { ClimbingBoxLoader } from 'react-spinners';
import { TabTitle } from '../../DynamicTitle/DynamicTitle';




const CompletedTask = () => {
    TabTitle('Completed Task-Task App')
    const [visibleDlt, setVisibleDlt] = useState(false)
    const [dlt, setDlt] = useState(null)
    const { user } = useContext(AuthContext)
    const crntUserMail = user.email
    const { data: tasks = [], refetch, isLoading } = useQuery(
        {
            queryKey: ['tasks'],
            queryFn: async () => {
                const res = await fetch(`https://task-app-server-iota.vercel.app/completedTask?email=${crntUserMail}`);
                const data = await res.json();
                return data
            }
        }
    )
    if(isLoading){
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }
    const handleComment = (event) => {
        // console.log(id)
        event.preventDefault()
        const form = event.target;
        const comment = form.comment.value;
        const id = form.id.value;
        console.log(comment, id)
        fetch(`https://task-app-server-iota.vercel.app/completedTask/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ comment: comment })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('comment added')
                    refetch()
                }
                else {
                    alert(data.message)
                }
            })
    }

    const handleComplete = id => {
        fetch(`https://task-app-server-iota.vercel.app/task/${id}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ status: "incomplete" })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    // refetch()
                }
                else {
                    toast.error(data.message)
                }
            })
    }
    const handleDelete = (id) => {
        setVisibleDlt(true)
        setDlt(id)
    }
    
    return (
        <div className='mx-10'>
            <h1>This is completed task</h1>
            <Table hoverable={true}>
                <Table.Head>
                    <Table.HeadCell>
                        Task Name
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Status
                    </Table.HeadCell>
                    <Table.HeadCell>
                        Comment
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">
                            Edit
                        </span>
                    </Table.HeadCell>
                    <Table.HeadCell>
                        <span className="sr-only">
                            delete
                        </span>
                    </Table.HeadCell>
                </Table.Head>
                <Table.Body className="divide-y">
                    {
                        tasks.map(task =>
                            <Table.Row key={task._id} className="bg-white dark:border-gray-700 dark:bg-gray-800">
                                <Table.Cell className="whitespace-nowrap font-medium text-gray-900 dark:text-white">
                                    {task.todo}
                                </Table.Cell>
                                <Table.Cell>
                                    <div className='flex items-center gap-1'>
                                        <FaCircle className='text-xs text-green-500'></FaCircle>{task.status}
                                    </div>
                                </Table.Cell>
                                <Table.Cell>
                                    <form onSubmit={handleComment}>
                                        <input name='comment' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-full" defaultValue={task.comment && task.comment} placeholder='Leave comment ....' required></input>
                                        <input type="text" name='id' value={task._id} hidden />
                                        <input type="submit" hidden />
                                    </form>
                                </Table.Cell>
                                <Table.Cell>
                                    <Link onClick={() => handleComplete(task._id)}
                                        to='/'
                                        className="font-medium text-blue-600 hover:underline dark:text-blue-500"
                                    >
                                        not complete
                                    </Link>
                                </Table.Cell>
                                <Table.Cell>
                                    <FaTrashAlt onClick={() => handleDelete(task._id)} className='cursor-pointer text-xl text-red-600'></FaTrashAlt>
                                </Table.Cell>
                            </Table.Row>
                        )
                    }
                </Table.Body>
            </Table>
            {

                dlt &&
                <DeleteModal visibleDlt={visibleDlt} setVisibleDlt={setVisibleDlt} dlt={dlt} refetch={refetch}></DeleteModal>

            }
        </div>
    );
};

export default CompletedTask;