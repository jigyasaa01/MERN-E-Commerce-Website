import React, { useState } from 'react'
import { toast } from 'react-toastify'
import {
  useCreateCategoryMutation,
  useUpdateCategoryMutation,
  useDeleteCategoryMutation,
  useFetchCategoriesQuery
} from '../../redux/api/categoryApiSlice.js'

import CategoryForm from '../../components/CategoryForm'
import Modal from '../../components/Modal.jsx'

const CategoryList = () => {
  const { data: categories, refetch } = useFetchCategoriesQuery()
  const [name, setName] = useState('')
  const [selectedCategory, setSelectedCategory] = useState(null)
  const [updateName, setUpdateName] = useState('')
  const [modalVisible, setModalVisible] = useState(false)

  const [createCategory] = useCreateCategoryMutation()
  const [updateCategory] = useUpdateCategoryMutation()
  const [deleteCategory] = useDeleteCategoryMutation()

  const handleCreateCategory = async (e) => {
    e.preventDefault()
    if (!name) {
      toast.error('Category name is required')
      return
    }

    try {
      const result = await createCategory({ name }).unwrap()
      if (result.error) {
        toast.error(result.error)
      } else {
        setName('')
        setModalVisible(false);
        toast.success(`${result.name} category created successfully`)
        refetch();
      }
    } catch (error) {
      console.error(error)
      toast.error('Creating category failed. Try again.')
    }
  }

    const handleUpdateCategory = async (e) => {
      e.preventDefault();
  
      if (!updateName) {
        toast.error("Category name is required");
        return;
      }
  
      try {
        const result = await updateCategory({
          categoryId: selectedCategory._id,
          updatedCategory: {
            name: updateName,
          },
        }).unwrap();
  
        if (result.error) {
          toast.error(result.error);
        } else {
          toast.success(`${result.name} is updated`);
          setSelectedCategory(null);
          setUpdateName("");
          setModalVisible(false);
        }
      } catch (error) {
        console.error(error);
      }
    }

  const handleDeleteCategory = async (categoryId) => {
    try {
        const result = await deleteCategory(categoryId).unwrap();

        if (result.error) {
        toast.error(result.error);
        } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        }
    } catch (error) {
        console.error(error);
        toast.error("Category deletion failed. Try again.");
    }
  }

  return (
    <div className="flex justify-center mt-10 bg-customBlack min-h-screen text-white">
      <div className="w-full max-w-4xl bg-black p-6 rounded-xl shadow-lg">
        <h1 className="text-2xl font-semibold mb-4 text-center text-blue-600">Manage Categories</h1>

        <div className="flex justify-end mb-4">
            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition"
                onClick={() => {
                    setModalVisible(true);
                    setSelectedCategory(null);
                    setName('');
                }}
            >
                + Add Category
            </button>
        </div>

        

        <div className="overflow-x-auto rounded-xl shadow-md">
          <table className="min-w-full bg-black border border-gray-200 rounded-xl overflow-hidden">
            <thead>
              <tr className="bg-customBlack text-left text-blue-600">
                <th className="py-2 px-4 border-b rounded-tl-xl">Category Name</th>
                <th className="py-2 px-4 border-b rounded-tr-xl text-center">Actions</th>
              </tr>
            </thead>
            <tbody>
              {categories?.length > 0 ? (
                categories.map((category) => (
                  <tr key={category._id} className="hover:bg-customBlack">
                    <td className="py-3 px-4 border-b">{category.name}</td>
                    <td className="py-3 px-4 border-b text-center space-x-2">
                      <button
                        className="text-blue-600 border border-blue-600 px-3 py-1 rounded hover:bg-blue-600 hover:text-white transition"
                        onClick={() => {
                          setModalVisible(true)
                          setSelectedCategory(category)
                          setUpdateName(category.name)
                        }}
                      >
                        Edit
                      </button>
                      <button
                        className="text-red-600 border border-red-600 px-3 py-1 rounded hover:bg-red-600 hover:text-white transition"
                        onClick={() => handleDeleteCategory(category._id)}
                      >
                        Delete
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="2" className="py-4 text-center text-gray-500">No categories found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
      {/* Modal Component */}
      <Modal
        visible={modalVisible}
        onClose={() => {
          setModalVisible(false);
          setSelectedCategory(null);
          setUpdateName('');
        }}
        title={selectedCategory ? 'Edit Category' : 'Add Category'}
        value={selectedCategory ? updateName : name}
        setValue={selectedCategory ? setUpdateName : setName}
        handleSubmit={selectedCategory ? handleUpdateCategory : handleCreateCategory}
        handleDelete={handleDeleteCategory}
      />
    </div>
  )
}

export default CategoryList
