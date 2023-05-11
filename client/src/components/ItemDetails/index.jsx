import React from 'react'

const ItemDetails = ({ ad }) => {
  return (
    <div className="details_container">
      {console.log(ad)}
      <h4 className="title">Details</h4>
      <div className="items">
        <div className="item">
          <p className="attribute">Brand</p>
          <p className="value">{ad.brand}</p>
        </div>
        <div className="item">
          <p className="attribute">Price</p>
          <p className="value">{<p>
            Rs.{" "}
            {ad.price
              .toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            /-
          </p>}</p>
        </div>
        <div className="item">
          <p className="attribute">Condition</p>
          <p className="value">{ad.condition}</p>
        </div>

        <div className="item">
          <p className="attribute">Category</p>
          <p className="value">{ad.category.name}</p>
        </div>
      </div>

      <hr />

      <div className="description_contianer">
        <h4 className="title">Description</h4>
        <p className="description">{ad.description}</p>
      </div>
    </div>
  )
}

export default ItemDetails