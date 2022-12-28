import React from 'react';

const Home = () => {
    const handleTask = event => {
        event.preventDefault()
        const form = event.target;
        const task = form.task.value;
        console.log(task)
        const data = {
            todo: task,
            status: 'incomplete'
        }
        console.log(data)

        fetch('http://localhost:5000/task', {
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
                alert('your product added successfully')
            })

    }

    return (
        <div className=''>
            <h1 className='text-xl text-center font-bold text-blue-400'>Add Your Task Here</h1>
            <form onSubmit={handleTask} className='flex justify-center'>
                <input name='task' type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 text-center" placeholder="your task here" required></input>
                <input type="submit" hidden />
            </form>
        </div>
    );
};

export default Home;