import React from 'react'
import { useState } from 'react'
import { useDispatch } from 'react-redux'
// import { filterByCategory } from '../redux/ads/adsSlice'

const Categories = () => {
  const [category, setCategory] = useState('')
  const dispatch = useDispatch()

  const handleCategories = (category) => {
    setCategory(category)
    if (!category) {
      return
    }

    // dispatch(filterByCategory(category))
  }

  return (
    <ul className="categories_navlinks">
      <li className="navlink" onClick={() => handleCategories('Mobile Phones')}>
        <img src="https://cdn-icons-png.flaticon.com/512/644/644458.png" alt="" className='nav_image' />
        <br />
        Mobile Phones
      </li>
      <li className="navlink" onClick={() => handleCategories('Cars')}>
        <img src="https://cdn-icons-png.flaticon.com/512/2962/2962520.png" alt="" className='nav_image' />
        <br />
        Cars
      </li>
      <li className="navlink" onClick={() => handleCategories('Motorcycles')}>
        <img src="https://cdn-icons-png.flaticon.com/512/3148/3148937.png" alt="" className='nav_image' />
        <br />
        Motorcycles
      </li>
      <li className="navlink" onClick={() => handleCategories('Houses')}>
        <img src="https://cdn-icons-png.flaticon.com/512/2544/2544056.png" alt="" className='nav_image' />
        <br />
        Houses
      </li>
      <li className="navlink" onClick={() => handleCategories('Tv')}>
        <img src="https://cdn-icons-png.flaticon.com/512/3567/3567356.png" alt="" className='nav_image' />
        <br />
        TV
      </li>
      <li className="navlink" onClick={() => handleCategories('Video-Audio')}>
        <img src="https://cdn-icons-png.flaticon.com/512/1644/1644133.png" alt="" className='nav_image' />
        <br />
        Video-Audio
      </li>
      <li className="navlink" onClick={() => handleCategories('Tablets')}>
        <img src="https://cdn-icons-png.flaticon.com/512/644/644425.png" alt="" className='nav_image' />
        <br />
        Tablets
      </li>
      <li className="navlink" onClick={() => handleCategories('Laptops')}>
        <img src="https://cdn-icons-png.flaticon.com/512/2888/2888701.png" alt="" className='nav_image' />
        <br />
        Laptops
      </li>
      <li className="navlink" onClick={() => handleCategories('Land & Plots')}>
        <img src="https://cdn-icons-png.flaticon.com/512/7910/7910381.png" alt="" className='nav_image' />
        <br />
        Land & Plots
      </li>
      <li className="navlink" onClick={() => handleCategories('Others')}>
        <img src="https://cdn-icons-png.flaticon.com/512/9822/9822895.png" alt="" className='nav_image' />
        <br />
        Others
      </li>
    </ul>
  )
}

export default Categories