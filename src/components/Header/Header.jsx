import React from 'react'
import {Button, Container, Logo, LogoutBtn} from '../index'
import { Link } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { useNavigate } from "react-router-dom";

function Header() {
  const authStatus = useSelector((state) => state.auth.status)
  const navigate = useNavigate()

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
            <Link to='/'>
              <Logo width='100px'  />
            </Link>
          </div>

          <ul className='flex ml-auto'>
              {navItems.map((item) => 
              item.active ? (
                <li key={item.name}>
                  <Button
                  onClick={() => navigate(item.slug)}
                  className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'>{item.name}</Button>
                </li>
              ) : null
              )}

              {authStatus && (
                <li>
                <LogoutBtn />
                </li>
              )}

                <li>
                <Button
                className='inline-block px-6 py-2 duration-200 hover:bg-blue-100 rounded-full'
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