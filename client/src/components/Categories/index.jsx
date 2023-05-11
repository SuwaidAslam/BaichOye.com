import React from 'react'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { filterByCategory } from '../../redux/ads/adsSlice'
import { getCategories, reset } from '../../redux/category/categorySlice'
import "./categories.css"
import { STATIC_FILES_URL } from '../../constants/url'
import { ThreeDots } from 'react-loader-spinner'

const Categories = () => {
  const [category, setCategory] = useState('')
  const { categories, isLoading } = useSelector(
    (selector) => selector.categories
  )

  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getCategories())
  }, [dispatch])

  useEffect(() => {
    return () => dispatch(reset())
  }, [dispatch])

  if (isLoading) {
    return (
      <div
        style={{
          height: '100vh',
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <ThreeDots color="#3a77ff" height={100} width={100} />
      </div>
    )
  }

  const handleCategories = (category) => {
    setCategory(category)
    if (!category) {
      return
    }
    dispatch(filterByCategory(category))
    // map over categories
  }

  return (
    <ul className="categories_navlinks">
      {categories.length > 0 ? (
        categories.map((category) => <li className="navlink" onClick={() => handleCategories(category.name)}>
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