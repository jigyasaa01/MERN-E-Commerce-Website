import React from 'react'
import { useEffect, useState } from 'react'
import {FaTrash, FaEdit, FaCheck, FaTimes} from 'react-icons/fa'
import Loader from '../../components/Loader'
import { toast } from 'react-toastify'
import {
    useGetUsersQuery,
    useDeleteUserMutation,
    useUpdateUserMutation
} from '../../redux/api/usersApiSlice'
import Message from '../../components/Message'


const UserList = () => {
    const {data: users, refetch, isLoading, error} = useGetUsersQuery()
    const [deleteUser] = useDeleteUserMutation()
    const [updateUser] = useUpdateUserMutation()

    const[editableUserId, setEditableUserId] = useState(null)
    const [editableUserName, setEditableUserName] = useState('')
    const [editableUserEmail, setEditableUserEmail] = useState('')

    useEffect(() => {
        refetch();
    }, [refetch])

    const deleteHandler = async(userId) => {
        if(window.confirm('Are you sure ?')) {
            try {
                await deleteUser(userId);
                refetch();
            } catch (error) {
                toast.error(error?.data?.message || error.message)
            }
        }
    }

    const toggleEdit = (userId, username, email) => {
        setEditableUserId(userId)
        setEditableUserName(username)
        setEditableUserEmail(email)
    }

    const updateHandler = async(id) => {
        try {
            await updateUser({
                userId: id, 
                username: editableUserName, 
                email: editableUserEmail
            })

            setEditableUserId(null)
            refetch();
        } catch (error) {
            toast.error(error?.data?.message || error.message)
        }
    }


  return (
    <div className='p-4'>
        <h1 className="text-2xl font-semibold mb-4">Users</h1>
        {isLoading ? (<Loader/>) : error ? (<Message variant='danger'>{error?.data?.message || error.message}</Message>) : (
            <div className="flex flex-col md:flex-row">
                {/* <AdminMenu/> */}
                <table className="w-full md:w-4/5 mx-auto">
                    <thead>
                        <tr>
                            <th className='px-4 py-2 text-left'>ID</th>
                            <th className='px-4 py-2 text-left'>Full Name</th>
                            <th className='px-4 py-2 text-left'>Email</th>
                            <th className='px-4 py-2 text-left'>Admin</th>
                            <th className='px-4 py-2 text-left'></th>
                        </tr>
                    </thead>
                    <tbody>
                        {users.map(user => (
                            <tr key={user._id}>
                                <td className='px-4 py-2'>
                                    {user._id}
                                </td>
                                <td className='px-4 py-2'>
                                    {editableUserId === user._id ? (
                                        <div className="flex item-center">
                                            <input type='text'
                                            value={editableUserName} onChange={(e) => setEditableUserName(e.target.value)}
                                            className='w-full p-2 bg-customBlack border rounded-lg' />
                                            <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                                <FaCheck/>

                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items center">
                                            {user.username} {' '}
                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className='ml-[1rem]'/>
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className='px-4 py-2'>
                                    {editableUserId === user._id ? (
                                        <div className="flex items-center">
                                            <input type="text" value={editableUserEmail} onChange={(e) => setEditableUserEmail(e.target.value)} className='w-full p-2 bg-customBlack border rounded-lg' />
                                            <button onClick={() => updateHandler(user._id)} className='ml-2 bg-blue-500 text-white py-2 px-4 rounded-lg'>
                                                <FaCheck/>
                                            </button>
                                        </div>
                                    ) : (
                                        <div className="flex items-center">
                                            <p>{user.email}</p>
                                            <button onClick={() => toggleEdit(user._id, user.username, user.email)}>
                                                <FaEdit className='ml-[1rem]'/>
                                            </button>
                                        </div>
                                    )}
                                </td>
                                <td className='px-4 py-2'>
                                    {user.isAdmin ? (
                                        <FaCheck style={{color: 'green'}}/>
                                    ) : (
                                        <FaTimes style={{color: 'red'}}/>
                                    )}
                                </td>

                                <td className="px-4 py-2">
                                    {!user.isAdmin && (
                                        <div className="flex">
                                            <button onClick={() => deleteHandler(user._id)} className='text-white font-bold py-2 px-4 rounded transform transition-transform duration-200 hover:scale-150'>
                                                <FaTrash/>
                                            </button>
                                        </div>
                                    )}
                                </td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        )}
    </div>
  )
}

export default UserList