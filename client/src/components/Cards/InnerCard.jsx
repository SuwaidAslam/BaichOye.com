import moment from 'moment'
import { Card, Col } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import { STATIC_FILES_URL } from '../../constants/url'
import "./innerCard.css"

export const InnerCard = ({ ad }) => {
  const navigate = useNavigate()

  const time = moment(ad.createdAt).fromNow()

  const handleClick = (id) => {
    navigate(`/item/${id}`, { state: ad })
  }

  return (
    <Col md={3} key={ad} onClick={() => handleClick(ad._id)}>
      <Card style={{ width: '100%', cursor: 'pointer' }}>
        <Card.Img
          variant="top"
          src={STATIC_FILES_URL + `/${ad.images[0]}`}
          height={300}
          style={{ objectFit: 'cover' }}
        />
        <Card.Body>
          <Card.Title
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              fontWeight: 'normal',
              fontSize: '14px',
            }}
            className='text_overflow'
          >
            {ad.title}
          </Card.Title>
          <Card.Text style={{ fontSize: '25px', fontWeight: 'bold' }} className='text_overflow'>
            Rs {ad.price
              .toString()
              .replace(
                /\B(?=(\d{3})+(?!\d))/g,
                ","
              )}
          </Card.Text>
          <Card.Text className='text_overflow'>
            {ad.location} - {time}
          </Card.Text>
        </Card.Body>
      </Card>
    </Col>
  )
}