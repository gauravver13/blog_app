import React, { useState } from 'react'
import { Button, Container, Logo, LogoutBtn} from '../index'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import hamburgerIcon from "/icon-hamburger.svg";
import closeIcon from "/icon-close.svg";
import "./Header.css";
// import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

  const [navOpen, setnavOpen] = useState(false)

  const closeNavbar = () => {    
    setnavOpen(false)
  }
   
  const toggleNavbar = () => {
    setnavOpen(!navOpen)
  }
  

  const navItems = [
    {
      name: 'Home',
      slug: "/",
      active: true
    },
    {
      name: 'Login',
      slug: "/login",
      active: !authStatus,
    },
    {
      name: 'Signup',
      slug: "/signup",
      active: !authStatus,
    },
    {
      name: 'All Post',
      slug: "/all-posts",
      active: authStatus,
    },
    {
      name: 'Add Post',
      slug: "/add-post",
      active: authStatus,
    },
  ]
  
  return (
    <header className='py-5 md:py-5 my-5 sticky top-0 z-50 px-0 md:px-10 bg-clip-padding'>
      <Container>
        <nav className='flex justify-between flex-wrap items-center'>
          <div className=''>
            <Link to='/' onClick={closeNavbar} >
              <Logo width='100px'  /> {" "}
            </Link>
          </div>

          <div className="md:hidden mr-4">
            <Button
            onClick={toggleNavbar}
            >
              <img src={navOpen ? closeIcon : hamburgerIcon} alt="" />
            </Button>
          </div>
          
          <ul 
          className={`ml-auto md:w-auto md:items-center md:flex-row md:flex border-red-600 ${ navOpen ? "w-full flex flex-col items-center" : "hidden" }`}>
              {navItems.map( (item) => 
              item.active && (
                <li key={item.name} className='my-2 md:my-0 '>
                  <NavLink
                  onClick={{closeNavbar} }
                  to={item.slug}
                  className='inline-block px-6 py-2 duration-200 hover:text-gray-600 '>
                    {item.name}
                  </NavLink>
                </li>
              ) 
              )}

              {authStatus && (
                <li
                onClick={closeNavbar}>
                <LogoutBtn />
                </li>
              )} 

                <li>
                <Button
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100'
                >Mode
                </Button>
                </li>
          </ul>
        </nav>
      </Container>
      
    </header>
  )
}

export default Header