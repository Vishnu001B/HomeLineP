import React from 'react'

const AddCatogry = () => {
  return (
    <div>
      <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="categories" className="block text-gray-700 font-medium mb-2">
              Category
            </label>
            <input
              type="text"
              id="categories"
              name="categories"
              value={formData.categories}
              onChange={handleInputChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter category"
            />
          </div>
          <div>
            <label htmlFor="subcategory" className="block text-gray-700 font-medium mb-2">
              Subcategories
            </label>
            <input
              type="text"
              id="subcategoryInput"
              value={subcategoryInput}
              onChange={handleSubcategoryChange}
              className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
              placeholder="Enter subcategory"
            />
            <button
              type="button"
              onClick={addSubcategory}
              className="mt-2 bg-blue-500 text-black px-4 py-1 rounded hover:bg-blue-600 transition duration-200"
            >
              Add Subcategory
            </button>
            <ul className="mt-2">
              {formData.subcategories.map((sub, index) => (
                <li key={index} className="text-black">
                  {sub}
                </li>
              ))}
            </ul>
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-black py-2 rounded hover:bg-blue-600 transition duration-200"
          >
            {editingCategory ? 'Update' : 'Create'}
          </button>
        </form>
    </div>
  )
}

export default AddCatogry
