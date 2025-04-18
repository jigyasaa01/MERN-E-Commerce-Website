import React from 'react'

const CategoryForm = ({
  value,
  setValue,
  handleSubmit,
  buttonText = 'Submit',
  handleDelete
}) => {
  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <input
        type="text"
        className="py-3 px-4 border border-gray-300 rounded-lg w-full text-white focus:outline-none focus:ring-1 focus:ring-blue-400 bg-black"
        placeholder="New Category"
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      <div className="flex justify-between">
        <button
          type="submit"
          className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50 w-full"
        >
          {buttonText}
        </button>
        {handleDelete && (
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50"
          >
            Delete
          </button>
        )}
      </div>
    </form>
  )
}

export default CategoryForm
