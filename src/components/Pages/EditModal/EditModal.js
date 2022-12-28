import { Button, Modal } from 'flowbite-react';
import React, { useEffect, useState } from 'react';

const EditModal = ({ edit, refetch, visible, setVisible }) => {
    const [info, setInfo] = useState([])
    useEffect(() => {
        fetch(`http://localhost:5000/task/${edit}`)
            .then(res => res.json())
            .then(data => {
                console.log(data)
                setInfo(data)
            })
    }, [edit])

    const handleEdit = event => {
        event.preventDefault()
        const form = event.target;
        const data = form.task.value;


        fetch(`http://localhost:5000/task/${edit}`, {
            method: "PATCH",
            headers: {
                'content-type': 'application/json'
            },
            body: JSON.stringify({ todo: data })
        })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                if (data.acknowledged) {
                    alert('saved changes')
                    refetch()
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
                        <Button type='submit' className='mt-4'>
                            update your task
                        </Button>
                    </form>
                </div>
            </Modal.Body>
        </Modal>
    )
}

export default EditModal;