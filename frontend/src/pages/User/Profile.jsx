import React from 'react'
import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { setCredentials } from '../../redux/features/auth/authSlice'
import Loader from '../../components/Loader'
import { Link } from 'react-router'
import { useProfileMutation } from '../../redux/api/usersApiSlice'

const Profile = () => {
    const [username, setUsername] = useState('')
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('');
    const [editMode, setEditMode] = useState(false);


    const {userInfo} = useSelector(state => state.auth)

    const [updateProfile, {isLoading: loadingUpdateProfile}] = useProfileMutation();

    const dispatch = useDispatch();

    useEffect(() => {
        setUsername(userInfo.username)
        setEmail(userInfo.email)
    }, [userInfo.username, userInfo.email])

    const submitHandler = async(e) => {
        e.preventDefault()
        
        if(password !== confirmPassword) {
            toast.error('Passwords do not match')
        } else {
            try {
                const res = await updateProfile({
                    _id: userInfo._id, 
                    username, 
                    email, 
                    password}).unwrap()
                dispatch(setCredentials({...res}))
                toast.success('Profile updated successfully')
                setEditMode(false)
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white p-4">
        <div className="bg-[#111] p-8 rounded-xl shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">My Profile</h2>

        {!editMode ? (
            <>
            <div className="mb-4">
                <p className="text-gray-400">Full Name</p>
                <p className="text-lg">{username}</p>
            </div>
            <div className="mb-4">
                <p className="text-gray-400">Email</p>
                <p className="text-lg">{email}</p>
            </div>

            <button
                className="w-full bg-blue-600 hover:bg-blue-700 py-2 px-4 rounded mt-4"
                onClick={() => setEditMode(true)}
            >
                Edit Details
            </button>
            </>
        ) : (
            <form onSubmit={submitHandler}>
            <div className="mb-4">
                <label className="block mb-1">Full Name</label>
                <input
                type="text"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">Email</label>
                <input
                type="email"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                />
            </div>

            <div className="mb-4">
                <label className="block mb-1">New Password</label>
                <input
                type="password"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Leave blank if unchanged"
                />
            </div>

            <div className="mb-6">
                <label className="block mb-1">Confirm Password</label>
                <input
                type="password"
                className="w-full px-3 py-2 rounded bg-gray-800 border border-gray-700"
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </div>

            <button
                type="submit"
                className="w-full  bg-blue-600 hover:bg-blue-700 text-white transition cursor-pointer py-2 px-4 rounded font-semibold"
                disabled={loadingUpdateProfile}
            >
                {loadingUpdateProfile ? <Loader /> : 'Update Profile'}
            </button>

            <button
                type="button"
                className="w-full mt-3 bg-red-700 hover:bg-red-800 py-2 px-4 rounded"
                onClick={() => setEditMode(false)}
            >
                Cancel
            </button>
            </form>
        )}
        
        </div>
    </div>
    );

}

export default Profile