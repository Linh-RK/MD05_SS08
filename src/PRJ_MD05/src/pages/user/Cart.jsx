import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Button, InputNumber, message } from "antd";
import { DeleteOutlined } from "@ant-design/icons";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
import { createOrder } from "../store/orderSlice";

const Cart = () => {
  const dispatch = useDispatch();
  const cartItems = useSelector((state) => state.cart.items);

  const handleRemove = (id) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id, quantity) => {
    dispatch(updateQuantity({ id, quantity }));
  };

  const handleCheckout = () => {
    dispatch(createOrder(cartItems))
      .unwrap()
      .then(() => {
        message.success("Order placed successfully");
        dispatch(clearCart());
      })
      .catch((error) => {
        message.error("Failed to place order: " + error.message);
      });
  };

  const columns = [
    {
      title: "Product",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Price",
      dataIndex: "price",
      key: "price",
      render: (price) => `$${price.toFixed(2)}`,
    },
    {
      title: "Quantity",
      dataIndex: "quantity",
      key: "quantity",
      render: (_, record) => (
        <InputNumber
          min={1}
          value={record.quantity}
          onChange={(value) => handleQuantityChange(record.id, value)}
        />
      ),
    },
    {
      title: "Total",
      key: "total",
      render: (_, record) => `$${(record.price * record.quantity).toFixed(2)}`,
    },
    {
      title: "Action",
      key: "action",
      render: (_, record) => (
        <Button
          icon={<DeleteOutlined />}
          onClick={() => handleRemove(record.id)}
          danger
        >
          Remove
        </Button>
      ),
    },
  ];

  const total = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">Shopping Cart</h1>
      <Table columns={columns} dataSource={cartItems} rowKey="id" />
      <div className="flex justify-between items-center mt-4">
        <h2 className="text-xl font-bold">Total: ${total.toFixed(2)}</h2>
        <Button
          type="primary"
          onClick={handleCheckout}
          disabled={cartItems.length === 0}
        >
          Checkout
        </Button>
      </div>
    </div>
  );
};

export default Cart;
