import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../Components/Sidebar";
// import {
//   RiShoppingCart2Line,
//   RiUser3Line,
//   RiFeedbackLine,
// } from "react-icons/ri";
import { IoIosLaptop } from "react-icons/io";
import { BiRupee } from "react-icons/bi";
// import { BsViewList } from "react-icons/bs";
// import { FaLaptopMedical } from "react-icons/fa";

import {
  RiUser3Line,
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiShieldCheckLine  
} from "react-icons/ri";

import "./Dashboard.css";
import { Link } from "react-router-dom";
import axios from "axios";
import { SERVER_URL } from '../constants/url'

function Dashboard() {
  // const [orders, setOrders] = useState();
  const [totalRevenue, setTotalRevenue] = useState(22);
  const [products, setProducts] = useState();
  const [users, setUsers] = useState();

  useEffect(() => {
    // getRevenue();
    getUsers();
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts();
    axios({
      method: "get",
      url: `${SERVER_URL}api/allAds`,
    }).then((response) => {
      setProducts(response.data);
    });
  };

  const getUsers = () => {
    setUsers();
    axios({
      method: "get",
      url: `${SERVER_URL}api/auth/allUsers`,
    }).then((response) => {
      setUsers(response.data);
    });
  };

  // const getRevenue = () => {
  //   // setOrders();
  //   axios({
  //     method: "get",
  //     url: `${SERVER_URL}api/wallet/allUsers`,
  //   }).then((response) => {
  //     // setOrders(response.data.allOrders);
  //     let rev = 0;
  //     response.data.allOrders.forEach((order) => {
  //       rev += order.orderAmount;
  //     });
  //     setTotalRevenue(rev);
  //   });
  // };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="dashboard-home-content" lg={10}>
          <h4>Dashboard</h4>
          <p>Here's an overview of your online business.</p>
          <Row>
            {/* <Col>
              {orders && (
                <Card className="dashboard-card">
                  <RiShoppingCart2Line className="card-icon" />
                  <h4>{orders.length} Orders</h4>
                  <p>{orders.length} orders placed</p>
                </Card>
              )}
            </Col> */}
            <Col>
              {/* {totalRevenue && (
                <Card className="dashboard-card">
                  <BiRupee className="card-icon" />
                  <h4>
                    {totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    Total Revenue
                  </h4>
                  <p>
                    {totalRevenue
                      .toString()
                      .replace(/\B(?=(\d{3})+(?!\d))/g, ",")}{" "}
                    revenue generated
                  </p>
                </Card>
              )} */}
            </Col>
            <Col>
              {products && (
                <Card className="dashboard-card">
                  <IoIosLaptop className="card-icon" />
                  <h4>{products.length} Advertisements</h4>
                  <p>{products.length} Items added</p>
                </Card>
              )}
            </Col>
            <Col>
              {users && (
                <Card className="dashboard-card">
                  <RiUser3Line className="card-icon" />
                  <h4>{users.length} Users</h4>
                  <p>{users.length} registered Users</p>
                </Card>
              )}
            </Col>
          </Row>
          <h4>Quick Links</h4>
          <Row>
            <Col>
              <Card className="dashboard-action-card">
                <RiFileList3Line className="action-icon" />
                <h4>Item Categories</h4>
                <p>
                  <Link to="/categories">Click here</Link> to add, remove or
                  edit categories
                </p>
              </Card>
            </Col>
            <Col>
              <Card className="dashboard-action-card">
                <IoIosLaptop className="action-icon" />
                <h4>All Advertisements</h4>
                <p>
                  <Link to="/ads">Click here</Link> to view or remove
                  ads
                </p>
              </Card>
            </Col>
            <Col>
              <Card className="dashboard-action-card">
                <RiUser3Line className="action-icon" />
                <h4>All Users</h4>
                <p>
                  <Link to="/users">Click here</Link> to view or delete users
                </p>
              </Card>
            </Col>
          </Row>
          <Row>
            <Col lg={4}>
              <Card className="dashboard-action-card">
                <RiShieldCheckLine className="action-icon" />
                <h4>User Verification</h4>
                <p>
                  <Link to="/user-verification">Click here</Link> to view, approve or reject user verification requests
                  orders
                </p>
              </Card>
            </Col>
            <Col lg={4}>
              <Card className="dashboard-action-card">
                <RiMoneyDollarCircleLine className="action-icon" />
                <h4>Payment Approvals</h4>
                <p>
                  <Link to="/payment-approval">Click here</Link> to view, approve or reject payment requests
                </p>
              </Card>
            </Col>
            {/* <Col>
              <Card className="dashboard-action-card">
                <RiFeedbackLine className="action-icon" />
                <h4>Complaints & Feedbacks</h4>
                <p>
                  <Link to="/complaints">Click here</Link> view complaints and
                  feedbacks
                </p>
              </Card>
            </Col> */}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Dashboard;
