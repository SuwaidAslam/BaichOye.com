import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import {
  RiMailLine,
  RiPhoneLine,
  RiHome2Line,
  RiMoneyDollarCircleLine,
} from "react-icons/ri";

import "./User.css";

function User(props) {
  const [user, setUser] = useState();
  const userId = props.match.params.userId;

  useEffect(() => {
    getUser();
  }, []);

  const getUser = () => {
    setUser();
    axios({
      method: "get",
      url: `http://localhost:5000/api/auth/users/${userId}`,
    }).then((response) => {
      setUser(response.data);
    });
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        {user && (
          <Col className="user-content" lg={10}>
            <Card className="single-user-card">
              <Row>
                <Col className="user-details-col">
                  <div className="chat_img">{user.fullName.charAt(0)}</div>
                  <h4>{user.fullName}</h4>
                  <hr />
                  <p>
                    <RiMoneyDollarCircleLine className="user-card-icon" /> {user.ads.length} active ads
                  </p>
                  <p>
                    <RiPhoneLine className="icon" /> {user.phone}
                  </p>
                  <p>
                    <RiMailLine className="icon" /> {user.email}
                  </p>
                  {/* <p>
                    <RiShoppingCartLine className="icon" />{" "}
                    {user.orders.length.toString()} order(s) placed so far.
                  </p> */}
                </Col>
                <Col className="user-orders-col">
                  <h6>Ads</h6>
                  <div className="orders-div">
                    {user.ads.map((ad) => {
                      return (
                        <Card className="user-order-card">
                          <Row>
                            <Col>
                              <p>
                                Ad ID :{" "}
                                <Link to={`/ads/${ad}`}>
                                  {ad}
                                </Link>{" "}
                              </p>
                              {/* <p>Ad Posted Date : {ad.orderedAt}</p>
                              <p>
                                Order Amount : Rs.{" "}
                                {order.orderAmount
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                /-
                              </p> */}
                            </Col>
                            {/* <Col>
                              <p>
                                Order Status :{" "}
                                {order.status === "placed"
                                  ? "Placed"
                                  : order.status === "shipped"
                                  ? "Shipped"
                                  : order.status === "delivered"
                                  ? "Delivered"
                                  : "Cancelled"}
                              </p>
                              <p>Shipping Status : {order.shippedAt}</p>
                              <p>Delivery Status : {order.deliveredAt}</p>
                            </Col> */}
                          </Row>
                        </Card>
                      );
                    })}
                  </div>
                </Col>
              </Row>
            </Card>
          </Col>
        )}
      </Row>
    </div>
  );
}

export default User;
