import { roundToNearestMinutes } from "date-fns/fp";
import { Toast } from "flowbite-react";
import React, { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";

const Home = () => {
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const handleTask = (event) => {
    event.preventDefault();
    const form = event.target;
    const task = form.task.value;
    console.log(task);
    if (user) {
      const data = {
        todo: task,
        status: "incomplete",
        email: user.email,
      };
      fetch("https://task-app-server-iota.vercel.app/task", {
        method: "POST",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify(data),
      })
        .then((res) => res.json())
        .then((data) => {
          form.reset();
          console.log(data);
          toast.success("your task added successfully");
          navigate("/myTask");
        });
    } else {
      navigate("/login");
    }
  };

  return (
    <div className="">
      <h1 className="text-xl text-center font-bold text-blue-400">
        Add Your Task Here
      </h1>
      <form onSubmit={handleTask} className="flex justify-center">
        <input
          name="task"
          type="text"
          id="first_name"
          className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg w-1/2 text-center"
          placeholder="your task here"
          required
        ></input>
        <input type="submit" hidden />
      </form>
    </div>
  );
};

export default Home;
