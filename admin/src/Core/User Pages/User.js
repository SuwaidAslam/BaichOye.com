import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { Link } from "react-router-dom";
import { format } from 'date-fns';
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
                    <RiPhoneLine className="icon" /> {user.phone}
                  </p>
                  <p>
                    <RiMailLine className="icon" /> {user.email}
                  </p>
                  <p>
                    <RiMoneyDollarCircleLine className="icon" />{" "}
                    {user.ads.length.toString()} active ad(s).
                  </p>
                </Col>
                <Col className="user-orders-col">
                  <h6>Ads</h6>
                  <div className="orders-div">
                    {user.ads.map((ad) => {
                      return (
                        <Card className="user-order-card">
                          <Row key={ad._id}>
                            <Col>
                              <p>
                                Ad ID :{" "}
                                <Link to={`/ads/${ad._id}`}>
                                  {ad._id}
                                </Link>{" "}
                              </p>
                              <p>Ad Posted Date : {format(new Date(ad.createdAt), 'dd/mm/yyyy')}</p>
                              <p>Ad Updated Date : {format(new Date(ad.updatedAt), 'dd/mm/yyyy')}</p>
                            </Col>
                            <Col>
                              <p>Category : {ad.category}</p>
                              <p>Location : {ad.location}</p>
                              <p>
                                Ad Price : Rs.{" "}
                                {ad.price
                                  .toString()
                                  .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                                /-
                              </p>
                            </Col>
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
