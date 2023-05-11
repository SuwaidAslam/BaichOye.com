import axios from "axios";
import React, { useEffect, useState } from "react";
import { Card, Col, Row } from "react-bootstrap";
import Sidebar from "../../Components/Sidebar";
import { RiDeleteBin3Line, RiEditLine } from "react-icons/ri";
import { STATIC_FILES_URL } from "../../constants/url";

import "./CategoryProduct.css";
import { Link } from "react-router-dom";

function CategoryProduct(props) {
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const category = props.match.params.categoryId;

  useEffect(() => {
    getProducts();
  }, []);

  const getProducts = () => {
    setProducts([]);
    axios({
      method: "get",
      url: `http://localhost:5000/api/categories/getAdsByCategory/${category}`,
    }).then((response) => {
      setProducts(response.data.ads);
      setFilteredProducts(response.data.ads);
    });
  };

  const deleteProduct = (productId) => {
    axios({
      method: "delete",
      url: `http://localhost:5000/api/item/delete/${productId}`,
    }).then((response) => {
      console.log(response.data);
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
        <Col className="category-products-content" lg={10}>
          <Row>
            <Col lg={8}>
              <h4>Ads</h4>
              <p>Below are the ads currently added to your website.</p>
            </Col>
            <Col className="category-product-search-col">
              <div className="category-product-search-div">
                <p>Search Ads</p>
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
          <Row className="category-products-row">
            {filteredProducts.map((product) => {
              const commaCost = product.price
                .toString()
                .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
              return (
                <Col lg={3}>
                  <Card className="category-product-card">
                    <img
                      src={`${STATIC_FILES_URL}${product.images[0]}`}
                      alt={product.title}
                    />
                    <h5>{product.name}</h5>
                    <p>Cost : Rs. {commaCost}/-</p>
                    {/* <Link to={`/products/edit/${product._id}`}>
                      <RiEditLine className="category-product-card-icon category-edit-icon" />
                    </Link> */}
                    <RiDeleteBin3Line
                      onClick={(event) => {
                        event.preventDefault();
                        deleteProduct(product._id);
                      }}
                      className="category-product-card-icon category-delete-icon"
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

export default CategoryProduct;
