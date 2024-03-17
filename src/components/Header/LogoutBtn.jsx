import React from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'

function LogoutBtn() {
    const dispatch = useDispatch()
    const logoutHandler = () => {
        authService.logout().then(() => {
            dispatch(logout())
        })
    }
  return (
    <button 
    className="py-2 px-5 bg-blue-400 text-white rounded-xl shadow-lg duration-400 hover:drop-shadow-2xl hover:bg-white hover:text-black hover:cursor-pointer"
    onClick={logoutHandler}
    >Logout
    </button>
  )
}

export default LogoutBtn