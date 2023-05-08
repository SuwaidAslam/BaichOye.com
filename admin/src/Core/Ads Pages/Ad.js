import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import ItemDetails from "../../Components/ItemDetails";
import {
  RiMailLine,
  RiPhoneLine,
  RiHome2Line,
  RiUser3Line,
  RiUserLocationLine,
  RiCalendarEventLine,
  RiCalendarTodoLine,
  RiCalendarCheckLine,
  RiMoneyDollarCircleLine,
  RiQuestionLine,
} from "react-icons/ri";
import { STATIC_FILES_URL } from "../../constants/url";

import "./Ad.css";
import { useHistory } from "react-router";
import Slider from '../../Components/Slider'

function Order(props) {
  const [ad, setAd] = useState({});
  const weekday = ["Sun", "Mon", "Tue", "Wed", "Thur", "Fri", "Sat"];
  const month = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  const history = useHistory();
  const adId = props.match.params.adId;
  useEffect(() => {
    getAd();
  }, []);

  const getAd = () => {
    setAd();
    axios({
      method: "get",
      url: `http://localhost:5000/api/ads/${adId}`,
    }).then((response) => {
      setAd(response.data);
    });
  };

  // const updateOrderStatus = (event, status, shippedAt, deliveredAt) => {
  //   event.preventDefault();
  //   axios({
  //     method: "patch",
  //     url: `https://ecommerceappcj.herokuapp.com/api/orders/${orderId}`,
  //     data: {
  //       status: status,
  //       shippedAt: shippedAt,
  //       deliveredAt: deliveredAt,
  //     },
  //   }).then((res) => {
  //     history.push("/orders");
  //   });
  // };

  // const deleteOrder = (event) => {
  //   event.preventDefault();
  //   axios({
  //     method: "delete",
  //     url: `https://ecommerceappcj.herokuapp.com/api/orders/${orderId}`,
  //   }).then(() => {
  //     history.push("/orders");
  //   });
  // };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="single-order-content" lg={10}>
          {console.log(ad)}
          {ad && ad.user && (
            <>
              <Card className="order-card">
                <Row className="ad-photos-slider">
                  <Col lg={6}>
                    <Slider images={ad.images} />
                  </Col>
                  <Col>
                    {ad &&
                      (
                        <ItemDetails ad={ad} />
                      )
                    }
                  </Col>
                </Row>
              </Card>
              <Card className="user-card">
                <Row className="order-user-details">
                  <Col lg={3}>
                  <div className="chat_img">{ad.user.fullName.charAt(0)}</div>
                  </Col>
                  <Col>
                    <Row>
                      <Col className="user-detail-col">
                        <p>
                          <RiUser3Line className="user-icon" />{" "}
                          {ad.user.fullName}
                        </p>
                        <p>
                          <RiPhoneLine className="user-icon" />{" "}
                          {ad.user.phone}
                        </p>
                        <p>
                          <RiMailLine className="user-icon" />{" "}
                          {ad.user.email}
                        </p>
                      </Col>
                    </Row>
                  </Col>
                </Row>
                {/* <Row className="order-actions">
                  <Col>
                    <button
                      onClick={(e) => {
                        let date = new Date();
                        const day = weekday[date.getDay()];
                        updateOrderStatus(
                          e,
                          "shipped",
                          `${day}, ${date.getDate()} ${
                            month[date.getMonth()]
                          } ${date.getFullYear()}`,
                          "Not yet delivered"
                        );
                      }}
                    >
                      Order Shipped
                    </button>
                  </Col>
                  <Col>
                    <button
                      onClick={(e) => {
                        let date = new Date();
                        const day = weekday[date.getDay()];
                        updateOrderStatus(
                          e,
                          "delivered",
                          order.shippedAt,
                          `${day}, ${date.getDate()} ${
                            month[date.getMonth()]
                          } ${date.getFullYear()}`
                        );
                      }}
                    >
                      Order Delivered
                    </button>
                  </Col>
                  <Col>
                    <button
                    onClick={(e) => {
                      updateOrderStatus(
                        e,
                        "cancelled",
                        order.shippedAt,
                        order.deliveredAt
                      );
                    }}
                    >
                      Order Cancelled
                    </button>
                  </Col>
                  <Col>
                    <button onClick={deleteOrder}>Delete Order</button>
                    <button>Delete Order</button>
                  </Col>
                </Row> */}
              </Card>
            </>
          )}
        </Col>
      </Row>
    </div>
  );
}

export default Order;
