import React from 'react'
import AddCategory from './AddCategory'
import AddSubCategory from './Addsubcategory'
import CategoryList from './CategoryList'

function Category() {
  return (
    <div className="p-6 font-sans">
      <div className="flex flex-col md:flex-row gap-4">
        <AddCategory />
        <AddSubCategory />
      </div>
      <CategoryList />
    </div>
  )
}

export default Category
