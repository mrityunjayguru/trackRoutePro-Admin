import React from 'react'
import AddCategory from './AddCategory'
import CategoryList from './CategoryList'
import AddSubCategory from './AddSubCategory'

function Category() {
  return (
    <div className=" font-sans">
      <div className="flex flex-col md:flex-row gap-4">
        <AddCategory />
        <AddSubCategory />
      </div>
      <CategoryList />
    </div>
  )
}

export default Category
