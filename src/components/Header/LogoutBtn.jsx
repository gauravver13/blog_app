import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import authService from '../../appwrite/auth'
import { logout } from '../../store/authSlice'
import Loader from '../Loader'

function LogoutBtn() {
      const dispatch = useDispatch()
  const [loading, setLoading] = useState(false);

    const logoutHandler = async () => {
      try {
        setLoading(true)
        await authService.logout().then(() => {
          dispatch(logout())
      })
      } catch (error) {
        console.log("Logout Failed: ", error);
      } finally {
        setLoading(false)
      }
      
    }
  return (
    <> 
      <button 
      className="py-5 px-5 bg-blue-400 text-white rounded-xl shadow-lg duration-400 hover:drop-shadow-2xl hover:bg-white hover:text-black hover:cursor-pointer"
      onClick={logoutHandler}
      >Logout
      </button>
    </>
  )
}

export default LogoutBtn