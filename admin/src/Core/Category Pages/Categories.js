import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiAddFill, RiEditLine, RiEyeLine, RiDeleteBin3Line } from "react-icons/ri";
import { STATIC_FILES_URL } from "../../constants/url";

import "./Categories.css";
import { Link } from "react-router-dom";

function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories();
  }, []);

  const getCategories = () => {
    setCategories([]);
    axios({
      method: "get",
      url: "http://localhost:5000/api/categories/getAll",
    }).then(function (response) {
      setCategories(response.data.categories);
    });
  };

  
  const deleteCategory = (categoryId) => {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/categories/delete/${categoryId}`,
    }).then((response) => {
      getCategories();
    });
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
              <h4>Product Categories</h4>
              <p>Below are the product categories currently added.</p>
            </Col>
            <Col className="add-cat-col" lg={2}>
              <OverlayTrigger
                placement="top"
                overlay={
                  <Tooltip>
                    <div className="add-cat-overlay">Add new category.</div>
                  </Tooltip>
                }
              >
                <Link to="/categories/add">
                  <div>
                    <RiAddFill className="add-cat-btn" />
                  </div>
                </Link>
              </OverlayTrigger>
            </Col>
          </Row>
          <hr />
          <Row className="categories-row">
            {categories.map((category) => {
              return (
                <Col lg={3}>
                  <Card className="category-card">
                    <img
                      src={`${STATIC_FILES_URL}/${category.image}`}
                      alt={category.name}
                    />
                    <h5>{category.name}</h5>
                    <Link to={`/categories/edit/${category._id}`}>
                      <RiEditLine className="edit-cat-btn" />
                    </Link>
                    <Link to={`/categories/ads/${category._id}`}>
                      <RiEyeLine className="view-prod-btn" />
                    </Link>
                    <RiDeleteBin3Line
                      onClick={(event) => {
                        event.preventDefault();
                        deleteCategory(category._id);
                      }}
                      className="category-card-icon delete-icon"
                    />
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

export default Categories;
