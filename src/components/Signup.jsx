import React, {useState} from 'react'
import authService from '../appwrite/auth'
import { Link, useNavigate } from 'react-router-dom'
import { login } from '../store/authSlice'
import { Button, Input, Logo, Loader} from './index.js'
import { useDispatch } from 'react-redux'
import { useForm } from 'react-hook-form'


function Signup() {
    const navigate = useNavigate("")
    const dispatch = useDispatch()
    const [error, setError] = useState("")
    const {register, handleSubmit} = useForm()
    const [loading, setLoading] = useState(false)

    const create = async(data) => {
        setError("")
        setLoading(true)
        try {
            const userData = await authService.createAccount(data)
            if(userData) {
                const userData = await authService.getCurrentUser()
                if(userData) dispatch(login(userData))
                navigate("/")
            }
        } catch (error) {
            setError(error.message)
        } finally {
            setLoading(false)
        }
    };

  return (
    <div className=" items-center justify-center md:min-h-[80vh] text-sm">
        <div className={`mx-auto w-full max-w-lg rounded-xl p-10 border-slate-800 border`}>
        <div className="mb-4 flex justify-center">
                <span className="inline-block w-full max-w-[80px]">
                    <Logo width='100%' />
                </span>
            </div>
            <h2 className="text-center text-lg font-bold leading-tight">Sign up to create your account</h2>
            <p className='mt-2 text-center text-sm text-white/60'>
                Already have an account?&nbsp;
                <Link
                    to="/login"
                    className='font-medium text-white/80 hover:text-white transition-all duration-200 hover:underline'
                >Sign In 
                </Link>
            </p>
            {error && <p className="text-red-600 mt-8 text-center">{error}</p> }

            <form onSubmit={handleSubmit(create)} className='mt-5'>
                <div className="space-y-5">
                    <Input 
                    label="Full Name: "
                    placeholder="Enter your full name"
                    className="focus:border-solid focus:border-x-2"
                    {...register("name", {
                        required: true,
                    })}
                    />
                    <Input label="Email: "
                    placeholder="Enter your email"
                    className="focus:border-solid focus:border-x-2"
                    type="email"
                    {...register("email", {
                        required: true,
                        validate: {
                            matchPattern: (value) => /^([\w\.\-_]+)?\w+@[\w-_]+(\.\w+){1,}$/igm.test(value) || "Email address must be a valid address",
                        }
                    })}
                    />
                    <Input
                    label="password: "
                    type="password"
                    className="focus:border-solid focus:border-x-2"
                    {...register("password", {
                        required: true,
                    })}
                    />
                    {loading ?  <div className='w-full grid place-items-center'> <Loader /> </div> : <Button
                    type="submit"
                    className="my-3 py-2 px-4 w-full text-white bg-[#00040F] button-custom rounded-lg shadow-lg hover:bg-[#5647e4] hover:text-black duration-400 hover:cursor-pointer"
                    >create Account
                    </Button> 
                    }
                </div>
            </form>
        </div>
    </div>
  )
}

export default Signup