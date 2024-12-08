import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Card, Button, Row, Col, message } from "antd";
import { HeartFilled, ShoppingCartOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";
import { fetchWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { addToCart } from "../store/cartSlice";

const { Meta } = Card;

const Wishlist = () => {
  const dispatch = useDispatch();
  const wishlist = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.wishlist.loading);

  useEffect(() => {
    dispatch(fetchWishlist());
  }, [dispatch]);

  const handleRemoveFromWishlist = (productId) => {
    dispatch(removeFromWishlist(productId));
  };

  const handleAddToCart = (product) => {
    dispatch(addToCart(product));
    message.success("Product added to cart");
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Wishlist</h1>
      {wishlist.length === 0 ? (
        <p>Your wishlist is empty.</p>
      ) : (
        <Row gutter={[16, 16]}>
          {wishlist.map((product) => (
            <Col key={product.id} xs={24} sm={12} md={8} lg={6}>
              <Card
                cover={<img alt={product.name} src={product.image} />}
                actions={[
                  <Button
                    key="remove"
                    icon={<HeartFilled />}
                    onClick={() => handleRemoveFromWishlist(product.id)}
                    danger
                  >
                    Remove
                  </Button>,
                  <Button
                    key="add-to-cart"
                    icon={<ShoppingCartOutlined />}
                    onClick={() => handleAddToCart(product)}
                    type="primary"
                  >
                    Add to Cart
                  </Button>,
                ]}
              >
                <Meta
                  title={
                    <Link to={`/product/${product.id}`}>{product.name}</Link>
                  }
                  description={`$${product.price.toFixed(2)}`}
                />
              </Card>
            </Col>
          ))}
        </Row>
      )}
    </div>
  );
};

export default Wishlist;
