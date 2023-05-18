import React from "react";
import {
  RiDashboardLine,
  RiShoppingCart2Line,
  RiUser3Line,
  RiAddFill,
  RiFileList3Line,
  RiMoneyDollarCircleLine,
  RiShieldCheckLine  
} from "react-icons/ri";

import { IoIosLaptop } from "react-icons/io";

import logo from "../Assets/logo.png";
import "./Sidebar.css";
import { Link, useHistory } from "react-router-dom";

function Sidebar() {
  const history = useHistory();

  const isActive = (history, path) => {
    if (history.location.pathname === path) {
      return true;
    } else {
      return false;
    }
  };

  return (
    <div className="sidebar-parent-div">
      <div className="sidebar-content-div">
        <div className="sidebar-logo-div">
          <img src={logo} alt="LOGO" />
        </div>
        <div className="sidebar-links-div">
          <Link to="/" className="sidebar-link">
            <div
              className={`sidebar-item ${isActive(history, "/") && "active"}`}
            >
              <RiDashboardLine className="sidebar-icon" />
              <p>Dashboard</p>
            </div>
          </Link>
          <Link to="/categories" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/categories") && "active"
              }`}
            >
              <RiFileList3Line className="sidebar-icon" />
              <p>Categories</p>
            </div>
          </Link>
          <Link to="/categories/add" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/categories/add") && "active"
              }`}
            >
              <RiAddFill className="sidebar-icon" />
              <p>Add Category</p>
            </div>
          </Link>
          <Link to="/ads" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/ads") && "active"
              }`}
            >
              <IoIosLaptop className="sidebar-icon" />
              <p>Advertisements</p>
            </div>
          </Link>
          <Link to="/orders" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/orders") && "active"
              }`}
            >
              <RiMoneyDollarCircleLine className="sidebar-icon" />
              <p>Payment Approvals</p>
            </div>
          </Link>
          <Link to="/users" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/users") && "active"
              }`}
            >
              <RiUser3Line className="sidebar-icon" />
              <p>Users</p>
            </div>
          </Link>
          <Link to="/user-verification" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/user-verification") && "active"
              }`}
            >
              <RiShieldCheckLine className="sidebar-icon" />
              <p>User Verification</p>
            </div>
          </Link>
          {/* <Link to="/complaints" className="sidebar-link">
            <div
              className={`sidebar-item ${
                isActive(history, "/complaints") && "active"
              }`}
            >
              <RiFeedbackLine className="sidebar-icon" />
              <p>Complaints & Feedbacks</p>
            </div>
          </Link> */}
        </div>
        <div className="sidebar-footer-div">
          <p>© Copyright BaichOye Inc.</p>
        </div>
      </div>
    </div>
  );
}

export default Sidebar;
