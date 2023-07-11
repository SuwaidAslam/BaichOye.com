import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiZoomInLine, RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { STATIC_FILES_URL } from "../../constants/url";
import "./PaymentApproval.css";
// import { Link } from "react-router-dom";
import { SERVER_URL } from "../../constants/url";

function PaymentApproval() {
  const [requests, setRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    setRequests([]);
    axios({
      method: "get",
      url: `${SERVER_URL}api/wallet/getPendingTransactions`,
    }).then(function (response) {
      setRequests(response.data.transactions);
    });
  };

  const rejectRequest = (id) => {
    axios({
      method: "post",
      url: `${SERVER_URL}api/wallet/rejectTransaction`,
      data: {
        id: id,
      },
    }).then(function (response) {
      getRequests();
    });
  };

  const approveRequest = (request) => {
    axios({
      method: "post",
      url: `${SERVER_URL}api/wallet/approveTransaction`,
      data: {
        id: request._id,
        adID: request.adId._id,
      },
    }).then(function (response) {
      getRequests();
    });
  };

  const handleZoomClick = (image) => {
    setSelectedImage(image);
  };

  const handleCloseModal = () => {
    setSelectedImage(null);
  };

  const handleOverlayClick = (event) => {
    if (event.target === event.currentTarget) {
      handleCloseModal();
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="categories-content" lg={10}>
          <Row>
            <Col lg={10}>
              <h4>Payment Approval Requests</h4>
              <p>Below are the Payment Approval Requests from users.</p>
            </Col>
            <Col className="add-cat-col" lg={2}></Col>
          </Row>
          <hr />
          <Row className="categories-row">
            {requests.map((request) => (
              <Col lg={3} key={request._id}>
                <Card className="category-card">
                  <img src={`${STATIC_FILES_URL}/${request.adId.images[0]}`} alt={request.name} />
                  <div className="card-details">
                    <div className="card-info">
                      <h5 className="card-title">Rs-{request.amount}</h5>
                      {/* <h6 className="card-text"></h6> */}
                    </div>
                    <div className="card-info">
                      <h5 className="card-title">From:</h5>
                      <h6 className="card-text">{request.buyerId.fullName}</h6>
                    </div>
                    <div className="card-info">
                      <h5 className="card-title">To:</h5>
                      <h6 className="card-text">{request.sellerId.fullName}</h6>
                    </div>
                  </div>
                  <div className="zoom-icon-wrapper" onClick={() => handleZoomClick(request.adId.images[0])}>
                    <RiZoomInLine className="zoom-cat-btn" />
                  </div>
                  <RiCheckboxCircleLine
                    onClick={(event) => {
                      event.preventDefault();
                      approveRequest(request);
                    }}
                    className="view-prod-btn" />
                  <RiCloseCircleLine
                    onClick={(event) => {
                      event.preventDefault();
                      rejectRequest(request._id);
                    }}
                    className="category-card-icon delete-icon "
                  />
                </Card>
              </Col>
            ))}
          </Row>
        </Col>
      </Row>
      {selectedImage && (
        <div className="zoomed-image-overlay" onClick={handleOverlayClick}>
          <div className="zoomed-image-container">
            <img src={`${STATIC_FILES_URL}/${selectedImage}`} alt="Zoomed ID" className="zoomed-image" />
          </div>
        </div>
      )}
    </div>
  );
}

export default PaymentApproval;
