import React from 'react'
import { useState } from 'react'
import { AiOutlineHome, AiOutlineShopping, AiOutlineLogin, AiOutlineUserAdd, AiOutlineShoppingCart } from 'react-icons/ai'
import { FaHeart } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import './Navigation.css'
import { useSelector, useDispatch } from 'react-redux'
import { useLogoutMutation } from '../../redux/api/usersApiSlice'
import {logout} from '../../redux/features/auth/authSlice'
import { IoPerson } from 'react-icons/io5';
import { HiOutlineViewGrid } from 'react-icons/hi';
import { FaBoxOpen } from 'react-icons/fa';
import { FaTags } from 'react-icons/fa';
import { FaShoppingCart } from 'react-icons/fa';
import { FaUsers } from 'react-icons/fa';
import { FaUserCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';



const Navigation = () => {
  const {userInfo} = useSelector(state => state.auth)

  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [showSidebar, setShowSidebar] = useState(false)

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen)
  }

  const toggleSidebar = () => {
    setShowSidebar(!showSidebar)
  }

  const closeSidebar = () => {
    setShowSidebar(false)
  }

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const[logoutApiCall] = useLogoutMutation()

  const logoutHandler = async() => {
    try {
      await logoutApiCall().unwrap()
      dispatch(logout()) 
      navigate('/login');
    } catch (error) {
      console.error(error)
    }
  }



  return (
    <div style={{zIndex: 999}} className={`${showSidebar ? "hidden" : "flex"} xl:flex lg:flex md:hidden sm:hidden flex-col justify-between p-4 text-white bg-black w-[4%] hover:w-[15%] h-[100vh] fixed`}
    id="navigation-container"
    >
      <div className="flex flex-col justify-center space-y-4">
        <Link to='/' className='flex items-center transition-transform transform hover:translate-x-2'>
        <AiOutlineHome className='mr-2 mt-[3rem]' size={26}/>
        <span className="hidden nav-item-name mt-[3rem]">Home</span> {" "}
        </Link>
        <Link to='/shop' className='flex items-center transition-transform transform hover:translate-x-2'>
        <AiOutlineShopping className='mr-2 mt-[3rem]' size={26}/>
        <span className="hidden nav-item-name mt-[3rem]">Shop</span> {" "}
        </Link>
        <Link to='/cart' className='flex items-center transition-transform transform hover:translate-x-2'>
        <AiOutlineShoppingCart className='mr-2 mt-[3rem]' size={26}/>
        <span className="hidden nav-item-name mt-[3rem]">My Cart</span> {" "}
        </Link>
        <Link to='/favorite' className='flex items-center transition-transform transform hover:translate-x-2'>
        <FaHeart className='mr-2 mt-[3rem]' size={26}/>
        <span className="hidden nav-item-name mt-[3rem]">Wishilist</span> {" "}
        </Link>
      </div>

      <div className="relative" onMouseLeave={() => setDropdownOpen(false)} onMouseEnter={() => setDropdownOpen(true)}>
        {/* Profile Sidebar Item */}
        <div className="relative mt-[3rem]">
          {/* Profile trigger */}
          {userInfo && ( 
            <div
              className="flex items-center text-white cursor-pointer hover:text-gray-400 transition">
              <IoPerson className="mr-2" size={26} />
              <span className="nav-item-name">{userInfo?.username}</span>
              <svg
                className={`w-4 h-4 ml-auto transform transition-transform duration-300 ${dropdownOpen ? 'rotate-180' : ''}`}
                viewBox="0 0 20 20"
                fill="currentColor"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.293l3.71-4.06a.75.75 0 011.1 1.02l-4.25 4.65a.75.75 0 01-1.1 0l-4.25-4.65a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          )}

          {/* Dropdown with transition */}
          <div className={`absolute bottom-full mb-2 left-0 w-48 bg-[#000000] text-white shadow-lg rounded-md py-2 z-10 transition-all duration-300 ${dropdownOpen ? 'opacity-100 visible' : 'opacity-0 invisible'}`}>
            {userInfo?.isAdmin && (
              <>
                <Link to='/admin/dashboard' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
                  <HiOutlineViewGrid className='mr-2' size={20}/>Dashboard
                </Link>
                <Link to='/admin/productslist' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
                  <FaBoxOpen className='mr-2' size={20}/> Products
                </Link>
                <Link to='/admin/categorylist' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
                  <FaTags className='mr-2' size={20}/>Category
                </Link>
                <Link to='/admin/orderlist' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
                  <FaShoppingCart className='mr-2' size={20}/>Orders
                </Link>
                <Link to='/admin/userlist' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
                  <FaUsers className='mr-2' size={20}/>Users
                </Link>
              </>
            )}
            <Link to='/profile' className='flex px-4 py-2 transition-transform transform hover:translate-x-2'>
              <FaUserCircle className='mr-2' size={20}/>Profile
            </Link>
            <button onClick={logoutHandler} className='flex w-full text-left px-4 py-2 transition-transform transform hover:translate-x-2'>
              <MdLogout className='mr-2' size={20}/>Logout
            </button>
          </div>
        </div>
      </div>


      {!userInfo && (
        <ul>
          <li>
            <Link to='/login' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineLogin className='mr-2 mt-[3rem]' size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Sign In</span> {" "}
            </Link>
          </li>
          <li>
            <Link to='/register' className='flex items-center transition-transform transform hover:translate-x-2'>
            <AiOutlineUserAdd className='mr-2 mt-[3rem]' size={26}/>
            <span className="hidden nav-item-name mt-[3rem]">Sign Up</span> {" "}
            </Link>
          </li>
        </ul>
      )}


    </div>
  )
}

export default Navigation