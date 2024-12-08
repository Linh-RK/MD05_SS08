import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  Card,
  Button,
  InputNumber,
  Tabs,
  Rate,
  Form,
  Input,
  List,
  Avatar,
} from "antd";
import {
  ShoppingCartOutlined,
  HeartOutlined,
  HeartFilled,
} from "@ant-design/icons";
import { fetchProductById } from "../store/productSlice";
import { addToCart } from "../store/cartSlice";
import { addToWishlist, removeFromWishlist } from "../store/wishlistSlice";
import { addReview } from "../store/reviewSlice";

const { TabPane } = Tabs;

const ProductDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const product = useSelector((state) => state.products.selectedProduct);
  const wishlist = useSelector((state) => state.wishlist.items);
  const loading = useSelector((state) => state.products.loading);
  const [quantity, setQuantity] = useState(1);
  const [form] = Form.useForm();

  useEffect(() => {
    if (id) {
      dispatch(fetchProductById(id));
    }
  }, [dispatch, id]);

  const handleAddToCart = () => {
    dispatch(addToCart({ ...product, quantity }));
    navigate("/cart");
  };

  const handleWishlist = () => {
    if (wishlist.some((item) => item.id === product.id)) {
      dispatch(removeFromWishlist(product.id));
    } else {
      dispatch(addToWishlist(product.id));
    }
  };

  const handleReviewSubmit = (values) => {
    dispatch(addReview({ productId: product.id, ...values }));
    form.resetFields();
  };

  if (loading || !product) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Card>
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-auto object-cover rounded-lg"
            />
          </div>
          <div className="md:w-1/2 md:pl-8 mt-4 md:mt-0">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <p className="text-xl mb-4">${product.price.toFixed(2)}</p>
            <p className="mb-4">{product.description}</p>
            <div className="flex items-center mb-4">
              <InputNumber min={1} value={quantity} onChange={setQuantity} />
              <Button
                type="primary"
                icon={<ShoppingCartOutlined />}
                onClick={handleAddToCart}
                className="ml-4"
              >
                Add to Cart
              </Button>
              <Button
                icon={
                  wishlist.some((item) => item.id === product.id) ? (
                    <HeartFilled />
                  ) : (
                    <HeartOutlined />
                  )
                }
                onClick={handleWishlist}
                className="ml-4"
              >
                {wishlist.some((item) => item.id === product.id)
                  ? "Remove from Wishlist"
                  : "Add to Wishlist"}
              </Button>
            </div>
          </div>
        </div>
      </Card>

      <Tabs defaultActiveKey="1" className="mt-8">
        <TabPane tab="Description" key="1">
          <p>{product.description}</p>
        </TabPane>
        <TabPane tab="Reviews" key="2">
          <List
            itemLayout="horizontal"
            dataSource={product.reviews || []}
            renderItem={(review) => (
              <List.Item>
                <List.Item.Meta
                  avatar={<Avatar src={review.avatar} />}
                  title={review.name}
                  description={
                    <>
                      <Rate disabled defaultValue={review.rating} />
                      <p>{review.comment}</p>
                    </>
                  }
                />
              </List.Item>
            )}
          />
          <Form
            form={form}
            onFinish={handleReviewSubmit}
            layout="vertical"
            className="mt-8"
          >
            <Form.Item
              name="rating"
              label="Rating"
              rules={[{ required: true }]}
            >
              <Rate />
            </Form.Item>
            <Form.Item
              name="comment"
              label="Comment"
              rules={[{ required: true }]}
            >
              <Input.TextArea rows={4} />
            </Form.Item>
            <Form.Item>
              <Button type="primary" htmlType="submit">
                Submit Review
              </Button>
            </Form.Item>
          </Form>
        </TabPane>
      </Tabs>
    </div>
  );
};

export default ProductDetail;
