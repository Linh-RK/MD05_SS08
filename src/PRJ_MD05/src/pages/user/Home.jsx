import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { Card, Row, Col, Button } from "antd";
import { ShoppingOutlined } from "@ant-design/icons";
import { fetchFeaturedProducts } from "../store/productSlice";
import { fetchCategories } from "../store/categorySlice";

const { Meta } = Card;

const Home = () => {
  const dispatch = useDispatch();
  const featuredProducts = useSelector((state) => state.products.featuredItems);
  const categories = useSelector((state) => state.categories.items);
  const loading = useSelector(
    (state) => state.products.loading || state.categories.loading
  );

  useEffect(() => {
    dispatch(fetchFeaturedProducts());
    dispatch(fetchCategories());
  }, [dispatch]);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-bold mb-8">Welcome to Our Store</h1>

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Featured Products</h2>
        <Row gutter={[16, 16]}>
          {featuredProducts.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                hoverable
                cover={
                  <img
                    alt={product.name}
                    src={product.image}
                    className="h-48 object-cover"
                  />
                }
                actions={[
                  <Link to={`/product/${product.id}`} key="view-details">
                    <Button icon={<ShoppingOutlined />}>View Details</Button>
                  </Link>,
                ]}
              >
                <Meta
                  title={product.name}
                  description={`$${product.price.toFixed(2)}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      </section>

      <section>
        <h2 className="text-2xl font-semibold mb-4">Shop by Category</h2>
        <Row gutter={[16, 16]}>
          {categories.map((category) => (
            <Col key={category.id} xs={24} sm={12} md={8} lg={6}>
              <Link to={`/products?category=${category.id}`}>
                <Card hoverable>
                  <Meta
                    title={category.name}
                    description={category.description}
                  />
                </Card>
              </Link>
            </Col>
          ))}
        </Row>
      </section>
    </div>
  );
};

export default Home;
