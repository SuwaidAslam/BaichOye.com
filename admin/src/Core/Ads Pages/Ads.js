import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiDeleteBin3Line, RiEditLine, RiExternalLinkLine } from "react-icons/ri";

import "./Ads.css";
import { Link } from "react-router-dom";
import { STATIC_FILES_URL } from "../../constants/url";

function Ads() {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts([]);
    axios({
      method: "get",
      url: "http://localhost:5000/api/allAds",
    }).then((response) => {
      setProducts(response.data);
      setFilteredProducts(response.data);
    });
  };

  const deleteProduct = (productId) => {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/item/delete/${productId}`,
    }).then((response) => {
      getProducts();
    });
  };

  const searchQueryChangeHandler = (event) => {
    event.preventDefault();
    const { value } = event.target;
    setSearchQuery(value);

    if (value === "") {
      setFilteredProducts(products);
    } else {
      setFilteredProducts([]);
      const query = value.toLowerCase();
      const length = query.length;

      products.forEach((product) => {
        const name = product.name.toLowerCase();
        const substring = name.substring(0, length);

        let res = substring.localeCompare(query);
        if (name.includes(query)) {
          setFilteredProducts((prev) => {
            return [...prev, product];
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
        <Col className="products-content" lg={10}>
          <Row>
            <Col lg={8}>
              <h4>Ads</h4>
              <p>Below are the Ads currently added to your website.</p>
            </Col>
            <Col className="product-search-col">
              <div className="product-search-div">
                <p>Search Ad</p>
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
          <Row className="products-row">
            {filteredProducts.map((product) => {
              const commaCost = product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return (
                <Col lg={3}>
                  <Card className="product-card">
                    <img
                      src={`${STATIC_FILES_URL}/${product.images[0]}`}
                      alt={product.title}
                    />
                    <h5>{product.title}</h5>
                    <p>Price : Rs. {commaCost}/-</p>
                    {/* <Link to={`/ads/edit/${product._id}`}>
                      <RiEditLine className="product-card-icon edit-icon" />
                    </Link> */}
                    <RiDeleteBin3Line
                      onClick={(event) => {
                        event.preventDefault();
                        deleteProduct(product._id);
                      }}
                      className="product-card-icon delete-icon"
                    />
                    <Link to={`/ads/${product._id}`}>
                      <RiExternalLinkLine className="ad-link" />
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

export default Ads;
