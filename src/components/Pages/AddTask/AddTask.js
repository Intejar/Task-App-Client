import { format } from "date-fns";
import {
  Button,
  Card,
  Checkbox,
  Label,
  Textarea,
  TextInput,
  Toast,
} from "flowbite-react";
import React, { useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../context/AuthProvider/AuthProvider";
import toast from "react-hot-toast";
import { TabTitle } from "../../DynamicTitle/DynamicTitle";

const AddTask = () => {
  TabTitle("Add Task-Task App");
  const imageHostKey = process.env.REACT_APP_imgbbKey;
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm();
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const handleTask = (data) => {
    console.log(data);
    const setDate = new Date();
    const task = data.task;
    const details = data.details;
    const email = user.email;
    const image = data.img[0];
    const formData = new FormData();
    formData.append("image", image);
    const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`;
    fetch(url, {
      method: "POST",
      body: formData,
    })
      .then((res) => res.json())
      .then((imgData) => {
        console.log("done");
        const img = imgData.data.url;
        const taskData = {
          task: task,
          details: details,
          image: img,
          email: email,
          date: format(setDate, "PP"),
        };
        fetch("https://localhost:5000/addTask", {
          method: "POST",
          headers: {
            "content-type": "application/json",
          },
          body: JSON.stringify(taskData),
        })
          .then((res) => res.json())
          .then((data) => {
            console.log(data);
            toast.success("your task added successfully");
            navigate("/media");
          });
      });
  };
  return (
    <div className=" bg-base-200 dark:bg-slate-800">
      <div className="max-w-sm mx-auto p-5">
        <Card>
          <form
            onSubmit={handleSubmit(handleTask)}
            className="flex flex-col gap-4"
          >
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your Task Name" />
              </div>
              <TextInput
                id="email1"
                type="text"
                placeholder="Task Name"
                required={true}
                {...register("task", { required: "Task Name is required" })}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="password1" value="Your Task Details" />
              </div>
              <Textarea
                id="comment"
                placeholder="Details here..."
                required={true}
                rows={4}
                {...register("details", {
                  required: "Task Details is required",
                })}
              />
            </div>
            <div>
              <div className="mb-2 block">
                <Label htmlFor="email1" value="Your Photo" />
              </div>
              <TextInput
                id="email1"
                type="file"
                placeholder="name@flowbite.com"
                required={true}
                {...register("img", { required: "Image is required" })}
              />
            </div>
            <Button type="submit">Submit</Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default AddTask;
