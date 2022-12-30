import { GoogleAuthProvider } from 'firebase/auth';
import React, { useContext, useState } from 'react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { FaEyeSlash, FaEye, FaGoogle, FaGithub, FaWindows } from "react-icons/fa";
import { AuthContext } from '../../context/AuthProvider/AuthProvider';
import { Button, Card, Checkbox, Label, TextInput } from 'flowbite-react';
import '../../Styles/Nav.css'
import { TabTitle } from '../../DynamicTitle/DynamicTitle';



const Register = () => {
    TabTitle('Signup-Task App')
    const { register, formState: { errors }, handleSubmit } = useForm();
    const { createUser, updateUserProfile, googleLogIn } = useContext(AuthContext)
    const googleProvider = new GoogleAuthProvider()
    const [open, setOpen] = useState(false);
    const [signUpError, setSignUpError] = useState('')
    const [userEmail, setUserEmail] = useState('')
    const location = useLocation();
    const imageHostKey = process.env.REACT_APP_imgbbKey;
    const from = location.state?.from?.pathname || '/';
    const navigate = useNavigate()
    

    const toggle = () => {
        setOpen(!open)
    }
    const handleRegister = data => {
        console.log(data)

        
        createUser(data.email, data.password)
            .then(result => {
                const user = result.user;
                console.log(user)
                const image = data.img[0]
                const formData = new FormData()
                formData.append('image', image)
                const url = `https://api.imgbb.com/1/upload?key=${imageHostKey}`
                fetch(url, {
                    method: 'POST',
                    body: formData
                })
                    .then(res => res.json())
                    .then(imgData => {
                        console.log('done')
                        const image = imgData.data.url
                        handleUpdate(data.name, image)
                        toast.success('user created successfully')
                        navigate(from, { replace: true });
                    })


            })
            .catch(error => {
                console.error(error)
                const errorMsg = error.message;
                setSignUpError(errorMsg)
            })
        const handleUpdate = (name, img) => {
            const profile = {
                displayName: name,
                photoURL: img
            }
            console.log(profile)
            updateUserProfile(profile)
                .then(() => { })
                .catch(e => console.error(e))
        }

    }
    const handleGoogleLogIn = () => {

        googleLogIn(googleProvider)
            .then(res => {
                const user = res.user
                console.log(user)
                navigate(from, { replace: true });
            })
            .catch(err => {
                const errMsg = err.message;
                setSignUpError(errMsg)
            })
    }

    return (
        <div className=" bg-base-200 dark:bg-slate-800">
            <div className="max-w-sm mx-auto p-5">
                <Card>
                    <form onSubmit={handleSubmit(handleRegister)} className="flex flex-col gap-4">
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="Name"
                                    value="Your Name"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="text"
                                placeholder="your name"
                                required={true}
                                {...register("name", { required: "Name is required" })}
                            />
                            {errors.name && <p className='text-sm text-red-400 mt-3' role="alert">{errors.name?.message}</p>}
                        </div>
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
                            />
                            {errors.email && <p className='text-sm text-red-400 mt-3' role="alert">{errors.email?.message}</p>}
                        </div>
                        <div>
                            <div className="mb-2 block">
                                <Label
                                    htmlFor="email1"
                                    value="Your Photo"
                                />
                            </div>
                            <TextInput
                                id="email1"
                                type="file"
                                placeholder="name@flowbite.com"
                                required={true}
                                {...register("img", { required: "Image is required" })}
    
                            />
                            {errors.img && <p className='text-sm text-red-400 mt-3' role="alert">{errors.img?.message}</p>}
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
                            <Label htmlFor="remember">
                                show password
                            </Label>
                        </div>
                        {
                            signUpError && <p className='text-red-500 my-3'>{signUpError}</p>
                        }
                        <Button type="submit" className='buttonClr'>
                            signup
                        </Button>
                        <div className="form-control mt-1">
                            <label className="label">
                                <h1 className='text-sm text-center'>Already have an account?<Link to='/login' className="text-blue-600 dark:text-white">login</Link></h1>
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

export default Register;