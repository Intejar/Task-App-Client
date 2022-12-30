import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import React, { useContext, useState } from 'react';
import { GoogleAuthProvider } from 'firebase/auth';
import { useForm } from 'react-hook-form';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye, FaGoogle, FaGithub } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import '../../Styles/Nav.css'
import { TabTitle } from '../../DynamicTitle/DynamicTitle';
import toast from 'react-hot-toast';

const Login = () => {
    TabTitle('Login-Task App')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const [logInError, setLogInError] = useState('')
    const [open, setOpen] = useState(false);
    const [logInSuccess, setLogInSuccess] = useState(false)
    const [getemail, setEmail] = useState('');
    const [logInUserEmail, setLogInUserEmail] = useState('')
    const { logIn, forgetPassword, googleLogIn } = useContext(AuthContext)
    const location = useLocation();
    const navigate = useNavigate();
    const googleProvider = new GoogleAuthProvider()

    const from = location.state?.from?.pathname || '/';
    
    const toggle = () => {
        setOpen(!open)
    }

    const handleLogin = data => {
        console.log(data)
        setLogInError('')
        setLogInSuccess(false)
        logIn(data.email, data.password)
            .then(res => {
                const user = res.user;
                console.log(user)
                toast.success('user login successfully')
                setLogInUserEmail(data.email)
                navigate(from, { replace: true });
            })
            .catch(err => {
                console.log(err)
                const errorMessage = err.message;
                setLogInError(errorMessage.slice(22, -2))
            })
    }
    const emailBlur = event => {
        let email = event.target.value
        setEmail(email);
    }

    const handlePassword = () => {
        forgetPassword(getemail)
            .then(() => {
                alert(`A link sent on ${getemail}`)
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                alert(errorMessage)
            });
    }

    const handleGoogleLogIn = () => {
        googleLogIn(googleProvider)
            .then(res => {
                const user = res.user
                console.log(user)
            })
            .catch(err => {
                const errMsg = err.message;
                setLogInError(errMsg)
                navigate(from, { replace: true });
            })
    }

    return (
        <div className=" bg-base-200 dark:bg-slate-800">
            <div className="max-w-sm mx-auto p-5">
                <Card>
                    <form onSubmit={handleSubmit(handleLogin)} className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your email"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="email"
                                placeholder="name@gmail.com"
                                required={true}
                                {...register("email", { required: "Email Address is required" })}
                                onBlur={emailBlur}
                            />
                            {errors.email && <p className='text-sm text-red-400 mt-3' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="password1"
                                    value="Your password"
                                />
                            </div>
                            <TextInput
                                id="password1"
                                type={(open === false) ? 'password' : 'text'}
                                required={true}
                                {...register("password", { required: "Password is required", pattern: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/ })}
                            />
                            {errors.password && <p className='text-sm text-red-400' role="alert">{errors.password?.message}</p>}
                            {errors?.password?.type === 'pattern' && <p className='text-xs text-red-400 max-w-fit mt-3' role="alert">Minimum eight characters, at least one uppercasse,lowercase,number,special letter</p>}
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox onClick={toggle} id="remember" />
                            <Label  htmlFor="remember">
                                show password
                            </Label>
                        </div>
                        {
                            logInError && <p className='text-red-500 my-3'>{logInError}</p>
                        }
                        <Button type="submit" className='buttonClr'>
                            Login
                        </Button>
                        <div className="form-control mt-1">
                            <label className="label">
                                <h1 className='text-sm text-center'>Do not have an account?<Link to='/signUp' className=" text-blue-600 dark:text-white">signup</Link></h1>
                            </label>
                        </div>
                        <div className='flex items-center space-x-2'>
                            <hr className='w-1/2' />
                            <h1 className='text-sm font-bold'>OR</h1>
                            <hr className='w-1/2' />
                        </div>
                        <div className="form-control mt-6 mx-auto">
                            <button onClick={handleGoogleLogIn} className="border border-blue-500 rounded-md p-5 btn btn-primary"><span className='flex items-center space-x-4'><span><FaGoogle className='text-red-400'></FaGoogle> </span> <span className='text-blue-400 font-bold'>continue with google</span></span></button>
                        </div>
                    </form>
                </Card>
            </div>
        </div>
    );
};

export default Login;