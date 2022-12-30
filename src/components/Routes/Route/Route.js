import { createBrowserRouter } from "react-router-dom";
import Main from "../../Layout/Main";
import AddTask from "../../Pages/AddTask/AddTask";
import CompletedTask from "../../Pages/CompletedTask/CompletedTask";
import Contact from "../../Pages/Contact/Contact";
import Home from "../../Pages/Home/Home";
import Media from "../../Pages/Media/Media";
import MyTask from "../../Pages/MyTask/MyTask";
import Login from "../../Shared/Login/Login";
import Register from "../../Shared/Register/Register";
import PrivateRoute from "../PrivateRoute/PrivateRoute";

const router = createBrowserRouter([
    {
        path:'/',
        element:<Main></Main>,
        children:[
            {
                path:'/',
                element: <MyTask></MyTask>
            },
            {
                path:'/addTask',
                element:<PrivateRoute><AddTask></AddTask></PrivateRoute>
            },
            {
                path:'/completedTask',
                element:<PrivateRoute><CompletedTask></CompletedTask></PrivateRoute>
            },
            {
                path:'/media',
                element:<PrivateRoute><Media></Media></PrivateRoute>
            },
            {
                path:'/signUp',
                element:<Register></Register>
            },
            {
                path:'/login',
                element:<Login></Login>
            },
            {
                path:'/contact',
                element:<Contact></Contact>
            }

        ]
    }
])


export default router