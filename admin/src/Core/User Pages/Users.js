import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";

import {
  RiMailLine,
  RiPhoneLine,
  RiMoneyDollarCircleLine,
  RiExternalLinkLine,
} from "react-icons/ri";

import "./Users.css";
import { Link } from "react-router-dom";

function Users() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = () => {
    setUsers([]);
    setFilteredUsers([]);
    axios({
      method: "get",
      url: "http://localhost:5000/api/auth/allUsers",
    }).then((response) => {
      console.log(response.data);
      setFilteredUsers(response.data);
      setUsers(response.data);
    });
  };

  const searchQueryChangeHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredUsers(users);
    } else {
      setFilteredUsers([]);
      const query = value.toLowerCase();

      users.forEach((user) => {
        const name = user.fullName.toLowerCase();
        if (name.includes(query)) {
          setFilteredUsers((prev) => {
            return [...prev, user];
          });
        }
      });
    }
  };

  return (
    <div className="dashboard-parent-div">
      <Row>
        <Col lg={2}>
          <Sidebar />
        </Col>
        <Col className="users-content" lg={10}>
          <Row>
            <Col lg={8}>
              <h4>Users</h4>
              <p>
                Below are the customers that have registered on your website.
              </p>
            </Col>
            <Col className="users-search-col">
              <div className="users-search-div">
                <p>Search User</p>
                <input
                  type="text"
                  name="search"
                  value={searchQuery}
                  onChange={searchQueryChangeHandler}
                />
              </div>
            </Col>
          </Row>
          <hr />
          <Row className="users-row">
            {filteredUsers.map((user) => {
              return (
                <Col lg={3}>
                  <Card className="user-card">
                  <div className="chat_img">{user.fullName.charAt(0)}</div>
                    <h5>{user.fullName}</h5>
                    <hr />
                    <p>
                      <a href={`tel:${user.phone}`}>
                        <RiPhoneLine className="user-card-icon" />
                      </a>
                      {user.phone}
                    </p>
                    <p>
                      <a href={`mailto:${user.email}`}>
                        <RiMailLine className="user-card-icon" />
                      </a>
                      {user.email}
                    </p>
                    <p>
                      <RiMoneyDollarCircleLine className="user-card-icon" /> {user.ads.length} ads
                    </p>
                    <Link to={`/users/${user._id}`}>
                      <RiExternalLinkLine className="user-link" />
                    </Link>
                  </Card>
                </Col>
              );
            })}
          </Row>
        </Col>
      </Row>
    </div>
  );
}

export default Users;
