import React, {useState} from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { login as authLogin } from '../store/authSlice'
import {Button, Input, Logo} from "./index"
import authService from '../appwrite/auth'
import { useForm } from "react-hook-form"
import { useDispatch } from 'react-redux'

function Login() {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const {register, handleSubmit} = useForm()
    const [error, setError] = useState("")

    const login = async(data) => {
        setError("")
        try {
            const session = await authService.login(data)
            if(session) {
                const userData = await authService.
                getCurrentUser()
                if(userData) dispatch(authLogin(userData));
                navigate("/")
            }
            
        } catch (error) {
            setError(error.message)
        }
    }
  return (
    <div
    className='flex items-center justify-center w-full'
    >
        <div className={`mx-auto w-full md:max-w-sm rounded-xl p-5 md:p-8 border-slate-800 border`}
        >
            <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[80px]">
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className="text-center text-lg font-bold leading-tight">Sign in to your account</h2>
            <p className='mt-2 text-center text-white/60'>
                Don&apos;t have any account?&nbsp;
                <Link
                    to="/signup"
                    className='font-medium text-white/80 hover:text-white transition-all duration-200 hover:underline'
                >
                    Sign Up 
                </Link>
            </p>
            {error && <p className="text-red-600 mt-6 text-center">{error}</p>}
            <form onSubmit={handleSubmit(login)}
            className='mt-6'>
                <div className="space-y-4">
                    <Input 
                    label="Email: "
                    placeholder="Enter your email"
                    type="email"
                    {...register("email",
                    {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/.test(value) || 
                            "Email address must be a valid address"
                        }
                    })}
                    />
                    <Input 
                    label="Password"
                    type="password"
                    placeholder="Enter your password"
                    {...register("password",{
                        required: true,
                    })}
                    />
                    <Button
                    type='submit'
                    className="my-3 py-2 px-4 w-full text-white bg-blue-500  button-custom rounded-lg shadow-lg hover:bg-blue-700 hover:text-black duration-400 hover:cursor-pointer"                    
                    >Sign in
                    </Button>
                </div>
            </form>
        </div>
    </div>
  )
}

export default Login