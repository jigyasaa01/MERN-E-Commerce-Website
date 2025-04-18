import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useRegisterMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';

const Register = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [register, {isLoading}] = useRegisterMutation();

    const {userInfo} = useSelector(state => state.auth);

    const {search} = useLocation()
    const sp = new URLSearchParams(search)
    const redirect = sp.get('redirect') || '/'

    useEffect(() => {
        if(userInfo) {
            navigate(redirect)
        }

    }, [navigate, redirect, userInfo]);

    const submitHandler = async(e) => {
      e.preventDefault()

      if(password !== confirmPassword) {
        toast.error('Passwords do not match')
      } else {
        try {
          const res = await register({username, email, password}).unwrap()
          dispatch(setCredentials({...res}))
          navigate(redirect)
          toast.success('User registered successfully')
        } catch (err) {
          console.log(err)
          toast.error(err.data.message)
        }
      }
    }
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Sign Up<span className="text-blue-600">.</span>
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          Already a User?{' '}
          <Link
            to={redirect ? `/login?redirect=${redirect}` : "/login"} 
            className="text-blue-600 hover:underline cursor-pointer">
            Sign In
          </Link>
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-4">
          <div className="flex gap-4">
            <input
              type="text"
              placeholder="Full Name"
              id="name"
              className="w-full p-3 rounded-md bg-black placeholder-gray-300 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <input
            type="email"
            placeholder="Email"
            id="email"
            className="w-full p-3 rounded-md bg-black placeholder-gray-300 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Password"
            id="password"
            className="w-full p-3 rounded-md bg-black placeholder-gray-300 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            id="confirmPassword"
            className="w-full p-3 rounded-md bg-black placeholder-gray-300 border border-gray-600 text-white focus:ring-2 focus:ring-blue-500"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />

          <div className="flex justify-between gap-4 mt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-1/2 p-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer">
              {isLoading ? "Signing Up" : "Sign Up"}
            </button>

            {isLoading && <Loader/>}
            </div>
        </form>
      </div>
    </div>
  )
}

export default Register