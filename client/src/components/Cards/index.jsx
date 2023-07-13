import { useState, useEffect } from 'react'
import { Row } from 'react-bootstrap'
import { ThreeDots } from 'react-loader-spinner'
import { useDispatch, useSelector } from 'react-redux'
import { getAds, reset } from '../../redux/ads/adsSlice'
import { InnerCard } from './InnerCard'
import { PaginationControl } from 'react-bootstrap-pagination-control';

const Cards = () => {
  const { ads, isLoading, filteredAds } = useSelector(
    (selector) => selector.ads
  )
  const dispatch = useDispatch()
  const [currentPage, setCurrentPage] = useState(1)

  const adsPerPage = 12
  const indexOfLastAd = currentPage * adsPerPage
  const indexOfFirstAd = indexOfLastAd - adsPerPage
  const currentAds = filteredAds.slice(indexOfFirstAd, indexOfLastAd)

  // const pageNumbers = Math.ceil(filteredAds.length / adsPerPage)

  useEffect(() => {
    dispatch(getAds())
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

  return (
    <div className="AdCard">
      <Row className="g-3">
        {currentAds.length > 0 ? (
          currentAds.map((ad, index) => <InnerCard key={index} ad={ad} />)
        ) : (
          <div style={{ height: '35vh' }}>
            <h1>You have no ads to show</h1>
          </div>
        )}
      </Row>
      <PaginationControl
        page={currentPage}
        between={4}
        total={filteredAds.length}
        limit={adsPerPage}
        changePage={(currentPage) => {
          setCurrentPage(currentPage);
        }}
        ellipsis={1}
      />
    </div>
  )
}

export default Cards
