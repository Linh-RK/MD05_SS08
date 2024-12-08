import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useSearchParams } from "react-router-dom";
import { Card, Col, Row } from "antd";
import { Link } from "react-router-dom";
// import { RootState, AppDispatch } from '../store';
import { fetchProducts } from "../store/productSlice";

const { Meta } = Card;

const ProductList = () => {
  const dispatch = useDispatch();
  const products = useSelector((state) => state.products.items);
  const [searchParams] = useSearchParams();
  const searchTerm = searchParams.get("search") || "";

  useEffect(() => {
    dispatch(fetchProducts(searchTerm));
  }, [dispatch, searchTerm]);

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Products</h1>
      <Row gutter={[16, 16]}>
        {products.map((product) => (
          <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
            <Link to={`/product/${product.id}`}>
              <Card
                hoverable
                cover={<img alt={product.name} src={product.image} />}
              >
                <Meta title={product.name} description={`$${product.price}`} />
              </Card>
            </Link>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default ProductList;
