import React from 'react'
import { Carousel } from 'react-bootstrap'
import { STATIC_FILES_URL } from '../../constants/url'

const Slider = ({ images }) => {
  return (
    <>
      <Carousel style={{ background: '#000' }} indicators={false} nextLabel={null} prevLabel={null}>
        {images.map((img) => {
          return (
            <Carousel.Item key={img}>
              <img
                className="d-block w-100"
                src={STATIC_FILES_URL + `/${img}`}
                alt="First slide"
                width={500}
                height={500}
                style={{ objectFit: 'contain' }}
              />
            </Carousel.Item>
          )
        })}
      </Carousel>
    </>
  )
}

export default Slider