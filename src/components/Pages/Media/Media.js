import { useQuery } from "@tanstack/react-query";
import { Badge, Button, Card } from "flowbite-react";
import React, { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import { FaClock, FaTrashAlt, FaArrowRight } from "react-icons/fa";
import toast from "react-hot-toast";
import { ClimbingBoxLoader } from "react-spinners";
import { TabTitle } from "../../DynamicTitle/DynamicTitle";

const Media = () => {
  TabTitle("Media-Task App");
  const [visible, setVisible] = useState(false);
  const [edit, setEdit] = useState(null);
  const navigate = useNavigate();
  const { user } = useContext(AuthContext);
  const crntUserMail = user.email;

  const {
    data: tasks = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["tasks"],
    queryFn: async () => {
      const res = await fetch(
        `https://localhost:5000/addTask?email=${crntUserMail}`
      );
      const data = await res.json();
      return data;
    },
  });

  if (isLoading) {
    return (
      <div className="flex justify-center items-center">
        <ClimbingBoxLoader color="#36d7b7" />
      </div>
    );
  }

  const handleDelete = (id, name) => {
    const proceed = window.confirm(
      `Are you sure you want to delete ${name} task?`
    );
    if (proceed) {
      fetch(`https://localhost:5000/addTask/${id}`, {
        method: "DELETE",
      })
        .then((res) => res.json())
        .then((data) => {
          console.log(data);
          if (data.deletedCount > 0) {
            toast.success("task has been successfully deleted");
            refetch();
          }
        });
    }
  };
  return (
    <div className="mx-10 p-5">
      <div className="grid sm:grid-cols-1 md:grid-cols-3 gap-4">
        {tasks.map((task) => (
          <div className="max-w-sm">
            <Card imgSrc={task.image}>
              <h5 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                {task.task}
              </h5>
              <div className="flex items-center gap-1 text-xs">
                <FaClock></FaClock>
                {task.date}
              </div>

              <p className="font-normal text-gray-700 dark:text-gray-400">
                {task.details}
              </p>
              <div className="flex flex-wrap items-center gap-2">
                <div>
                  <Button onClick={() => handleDelete(task._id)}>
                    <FaTrashAlt className="mr-2 h-5 w-5"></FaTrashAlt>
                    Delete
                  </Button>
                </div>
                <div>
                  <Link to="/addTask">
                    <Button>
                      Add More
                      <FaArrowRight className="ml-2 h-5 w-5"></FaArrowRight>
                    </Button>
                  </Link>
                </div>
              </div>
            </Card>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Media;
