import React from 'react'
import { useState, useEffect } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { useLoginMutation } from '../../redux/api/usersApiSlice';
import { setCredentials } from '../../redux/features/auth/authSlice';
import { toast } from 'react-toastify';
import Loader from '../../components/Loader';


const Login = () => {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')

    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [login, {isLoading}] = useLoginMutation();

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
      try {
        const res = await login({email, password}).unwrap()
        console.log(res)
        dispatch(setCredentials({...res}))
      } catch (error) {
        toast.error(error?.data?.message || error.message)
      }
    }


  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="bg-black rounded-2xl shadow-lg w-full max-w-md p-8">
        <h1 className="text-2xl font-bold mb-2 text-white">
          Sign In<span className="text-blue-600">.</span>
        </h1>
        <p className="text-sm text-gray-300 mb-6">
          New User?{' '}
          <Link
            to={redirect ? `/register?redirect=${redirect}` : "/register"} 
            className="text-blue-600 hover:underline cursor-pointer">
            Sign Up
          </Link>
        </p>

        <form
          onSubmit={submitHandler}
          className="space-y-4">
          <div className="flex gap-4">
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

          <div className="flex justify-between gap-4 mt-4">
            <button
              disabled={isLoading}
              type="submit"
              className="w-1/2 p-3 rounded-md bg-blue-600 hover:bg-blue-500 text-white transition cursor-pointer"
            >
              {isLoading ? "Signing In" : "Sign In"}
            </button>

            {isLoading && <Loader/>}

          </div>
        </form>
      </div>
    </div>
  )
}

export default Login