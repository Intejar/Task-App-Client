import { Button, Checkbox, Label, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';
import toast from 'react-hot-toast';


const EditModal = ({ edit, refetch, visible, setVisible }) => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch(`https://task-app-server-iota.vercel.app/task/${edit}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setInfo(data)
            })
    }, [edit])
    let checkBox = info.check
    const handleCheck = data => {
        if (data === '') {
            console.log('done')
        }
        else {
            checkBox.push(data)
        }
    }
    console.log(checkBox)
    const handleEdit = event => {
        event.preventDefault()
        const form = event.target;
        const data = form.task.value;
        const todo = form.todo.value;
        handleCheck(todo)
        const editedData = {
            todo: data,
            check: checkBox
        }
        fetch(`https://task-app-server-iota.vercel.app/task/${edit}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ todo: editedData })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    toast.success('saved changes')
                    refetch()
                    form.reset()
                    
                }
                else {
                    alert(data.message)
                }
            })
    }


    return (
        <Modal
            show={visible}
            size="md"
            popup={true}
            onClose={() => setVisible(false)}
        >
            <Modal.Header />
            <Modal.Body>
                <div className="space-y-6 px-6 pb-4 sm:pb-6 lg:px-8 xl:pb-8">
                    <h3 className="text-xl font-medium text-gray-900 dark:text-white">
                        Update your task here
                    </h3>
                    <form onSubmit={handleEdit} className=''>
                        <input name='task' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center w-full" defaultValue={info.todo} required></input>
                        <input name='todo' type="text" id="" className="my-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg text-center w-full" placeholder='TODO Here..'></input>
                        <Button type='submit' className='mt-4'>
                            update your task
                        </Button>
                    </form>
                    <div
                            className="flex flex-col gap-4"
                            id="checkbox"
                        >
                            {
                                info?.check?.map(check =>
                                    <div className="flex items-center gap-2">
                                        <Checkbox id="promotion" />
                                        <Label htmlFor="promotion">
                                            {check}
                                        </Label>
                                    </div>
                                )
                            }

                        </div>

                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditModal;