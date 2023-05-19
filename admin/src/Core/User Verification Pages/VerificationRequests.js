import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiAddFill, RiEditLine, RiEyeLine, RiDeleteBin3Line, RiZoomInLine, RiCheckboxCircleLine, RiCloseCircleLine } from "react-icons/ri";
import { STATIC_FILES_URL } from "../../constants/url";
import "./VerificationRequests.css";
import { Link } from "react-router-dom";

function VerificationRequests() {
  const [requests, setRequests] = useState([]);
  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    getRequests();
  }, []);

  const getRequests = () => {
    setRequests([]);
    axios({
      method: "get",
      url: "http://localhost:5000/api/auth/getVerificationRequests",
    }).then(function (response) {
      setRequests(response.data);
    });
  };

  const rejectRequest = (id) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/auth/rejectVerificationRequest",
      data: {
        id: id,
      },
    }).then(function (response) {
      getRequests();
    });
  };

  const approveRequest = (id) => {
    axios({
      method: "post",
      url: "http://localhost:5000/api/auth/approveVerificationRequest",
      data: {
        id: id,
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
              <h4>Verification Requests</h4>
              <p>Below are the ID verification Requests from users.</p>
            </Col>
            <Col className="add-cat-col" lg={2}></Col>
          </Row>
          <hr />
          <Row className="categories-row">
            {requests.map((request) => (
              <Col lg={3} key={request}>
                <Card className="category-card">
                  {console.log(request)}
                  <img src={`${STATIC_FILES_URL}/${request.IDCardImage}`} alt={request.name} />
                  <div className="card-details">
                    <div className="card-info">
                      <h5 className="card-title">Issuing Country:</h5>
                      <h6 className="card-text">{request.issuingCountry}</h6>
                    </div>
                    <div className="card-info">
                      <h5 className="card-title">ID Type:</h5>
                      <h6 className="card-text">{request.IDType}</h6>
                    </div>
                  </div>
                  <div className="zoom-icon-wrapper" onClick={() => handleZoomClick(request.IDCardImage)}>
                    <RiZoomInLine className="zoom-cat-btn" />
                  </div>
                  <RiCheckboxCircleLine
                    onClick={(event) => {
                      event.preventDefault();
                      approveRequest(request._id);
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

export default VerificationRequests;
