import React, { useContext } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { ClimbingBoxLoader } from 'react-spinners';
import { AuthContext } from '../../context/AuthProvider/AuthProvider';

const PrivateRoute = ({children}) => {
    const {user, loading} = useContext(AuthContext)
    const location = useLocation()

    if(loading){
        return <div className='flex justify-center items-center'><ClimbingBoxLoader color="#36d7b7" /></div>
    }

    if(user){
        return children
    }
    return <Navigate to='/login' state={{from: location}} replace></Navigate>
};

export default PrivateRoute;