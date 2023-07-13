import React from 'react'
import "./categories.css"
import { STATIC_FILES_URL } from '../../constants/url'
import { filterByCategory } from '../../redux/ads/adsSlice'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getCategories, reset } from '../../redux/category/categorySlice'

const Categories = () => {

  const dispatch = useDispatch()

  const { categories } = useSelector(
    (selector) => selector.categories
  )

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    return () => dispatch(reset())
  }, [dispatch])

  const handleCategories = (category) => {
    if (!category) {
      return
    }
    dispatch(filterByCategory(category))
    // map over categories
  }

  return (
    <ul className="categories_navlinks">
      {categories && categories.length > 0 ? (
        categories.map((category, index) => <li className="navlink"  key={index} onClick={() => handleCategories(category.name)}>
          <img src={`${STATIC_FILES_URL}${category.image}`} alt="" className='nav_image' />
          <br />
          {category.name}
        </li>)
      ) : (
        <div style={{ height: '35vh' }}>
          <h1>{categories}</h1>
        </div>
      )}
    </ul>
  )
}

export default Categories