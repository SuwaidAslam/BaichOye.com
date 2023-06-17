import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { itemUser, resetUserItem } from '../../redux/ads/adsSlice'
import profile from '../../images/profile.png'
import moment from 'moment'
import { Loader } from '@googlemaps/js-api-loader'
import { Button } from 'react-bootstrap'
import { blue } from '@mui/material/colors'
import { fontWeight } from '@mui/system'
import { useNavigate } from 'react-router-dom'
import { current } from '@reduxjs/toolkit'
import toast from 'react-hot-toast'

const ItemSidebar = ({ ad }) => {
  const dispatch = useDispatch()
  const user = useSelector(
    (select) => select.ads.itemUser
  )

  const { fullName, email, phone } = user
  const currentUser = useSelector((select) => select.auth)

  const time = moment(ad.createdAt).fromNow()
  const date = moment(ad.createdAt).format('ll')
  const navigate = useNavigate()

  const handleBuy = (userId, ad) => {
    (userId == currentUser.user._id) ? toast.error("Cannot buy your own product") : navigate(`/payment`, { state: { userId, ad } })
  }

  const handleChat = (userId, adId) => {
    (userId == currentUser.user._id) ? toast.error("Cannot send message to Yourself") : navigate(`/chat/${userId}/${adId}`, { state: { user, ad } })
  }

  useEffect(() => {
    dispatch(itemUser(ad.user))

    return () => dispatch(resetUserItem())
  }, [dispatch, ad.user])

  useEffect(() => {
    /* global google */

    const loader = new Loader({
      apiKey: 'AIzaSyCxQJiXRp0_v0M3bL-103dsdCStBf6qskE',
      version: 'weekly',
    })

    loader.load().then(() => {
      initGeocodingMap()
    })

    function initGeocodingMap() {
      const location = ad && ad.location
      const geocoder = new google.maps.Geocoder()

      geocoder.geocode({ address: location }, function (results, status) {
        let lat
        let lng

        if (status === 'OK') {
          lat = results[0].geometry.location.lat()
          lng = results[0].geometry.location.lng()
        }

        var myLatLng = { lat, lng }

        var map = new google.maps.Map(document.getElementById('map'), {
          zoom: 11,
          center: myLatLng,
        })

        new google.maps.Marker({
          position: myLatLng,
          map: map,
          title: 'Hello World!',
        })
      })
    }
  }, [ad])

  return (
    <div className="item_sidebar_container">
      <div className="details_container">
        <h1 className="text_overflow heading" style={{ fontSize: '2rem', fontWeight: '1000', color: "#0d6efd" }}>
          {<p>
            Rs.{" "}
            {ad.price
              .toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
            /-
          </p>}
        </h1>
        <div
          className="description"
          style={{ opacity: '.6', marginTop: '12px' }}
        >
          {ad.title}
        </div>

        <div className="d-flex justify-content-between mt-3">
          <span>{ad.location}</span>
          <span>{time}</span>
        </div>
      </div>

      <div className="details_container">
        <h1 className="heading" style={{ fontSize: '1.5rem' }}>
          Seller Description
        </h1>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <img src={profile} style={{ width: '60px' }} alt="profile" />
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              marginLeft: '1rem',
            }}
          >
            <span style={{ fontWeight: 'bold' }}>{fullName && fullName}</span>
            <span style={{ opacity: '.6' }}>Member since {date}</span>
          </div>
        </div>

        <p style={{ marginTop: '14px' }}>
          <span style={{ fontWeight: 'bold' }}>Email:</span> {email && email}
        </p>
        {phone && (
          <p style={{ marginTop: '14px', marginBottom: '0px' }}>
            <span style={{ fontWeight: 'bold' }}>Phone:</span>{' '}
            {[phone] && phone}
          </p>
        )}
        <div className="d-grid gap-2 mt-2">
          <Button variant="primary" size="lg" onClick={() => handleBuy(ad.user, ad)}>
            Buy
          </Button>
          <Button variant="secondary" size="lg" onClick={() => handleChat(ad.user, ad._id)}>
            Chat
          </Button>
        </div>
        <div className="d-inline-flex flex-row justify-content-between align-items-center mt-4" style={{ backgroundColor: "#F1FBFD" }}>
          <div>
            <img loading="lazy" data-src="https://teja9.kuikr.com/core/clsfd/assets/ic-get-all-details-2x.png"
              alt="" src="https://teja9.kuikr.com/core/clsfd/assets/ic-get-all-details-2x.png" />
            <label>Get all details</label>
          </div>
          <div>
            <img loading="lazy" data-src="https://teja9.kuikr.com/core/clsfd/assets/ic-schedule-visit-bazaar-2x.png"
              alt="" src="https://teja9.kuikr.com/core/clsfd/assets/ic-schedule-visit-bazaar-2x.png" />
            <label>Schedule a visit</label>
          </div>
          <div>
            <img loading="lazy" data-src="https://teja9.kuikr.com/core/clsfd/assets/ic-negotiate-2x.png"
              alt="" src="https://teja9.kuikr.com/core/clsfd/assets/ic-negotiate-2x.png" />
            <label>Negotiate price</label>
          </div>
        </div>
      </div>

      {/* map */}
      <div className="details_container">
        <h1 className="heading" style={{ fontSize: '1.5rem' }}>
          Posted in
        </h1>

        <span style={{ opacity: 0.8, fontSize: '14px' }}>{ad.location}</span>

        <div
          id="map"
          style={{ width: '100%', height: '500px', marginTop: '.5rem' }}
        ></div>
      </div>

      {/* <div
        style={{ fontWeight: 'bold', marginTop: '8px', paddingLeft: '10px' }}
      >
        AD ID {ad._id}
      </div> */}
    </div>
  )
}

export default ItemSidebar