import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import Home from "../../Pages/Home/Home";
import MyTask from "../../Pages/MyTask/MyTask";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element:<Home></Home>
            },
            {
                path:'/myTask',
                element: <MyTask></MyTask>
            },
            {
                path:'/addTask',
                element:<AddTask></AddTask>
            },
            {
                path:'/completedTask',
                element:<CompletedTask></CompletedTask>
            }
        ]
    }
])


export default router