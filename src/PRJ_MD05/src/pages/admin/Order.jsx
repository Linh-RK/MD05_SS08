import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Tag, message } from "antd";
import { getOrdersAPI, updateOrderStatusAPI } from "../../api";

const Orders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchOrders = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getOrdersAPI(page, pageSize);
      setOrders(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.total,
      });
    } catch (error) {
      message.error("Failed to fetch orders");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
  }, []);

  const handleTableChange = (pagination) => {
    fetchOrders(pagination.current, pagination.pageSize);
  };

  const showModal = (order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatusAPI(orderId, newStatus);
      message.success("Order status updated successfully");
      fetchOrders(pagination.current, pagination.pageSize);
      setIsModalVisible(false);
    } catch (error) {
      message.error("Failed to update order status");
    }
  };

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Customer",
      dataIndex: "customer",
      key: "customer",
    },
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
      render: (total) => `$${total.toFixed(2)}`,
    },
    {
      title: "Status",
      dataIndex: "status",
      key: "status",
      render: (status) => (
        <Tag
          color={
            status === "Completed"
              ? "green"
              : status === "Processing"
              ? "blue"
              : "orange"
          }
        >
          {status}
        </Tag>
      ),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <Button onClick={() => showModal(record)}>View Details</Button>
      ),
    },
  ];

  return (
    <div>
      <h1>Orders Management</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title="Order Details"
        visible={isModalVisible}
        onCancel={() => setIsModalVisible(false)}
        footer={null}
      >
        {selectedOrder && (
          <div>
            <p>
              <strong>Order ID:</strong> {selectedOrder.id}
            </p>
            <p>
              <strong>Customer:</strong> {selectedOrder.customer}
            </p>
            <p>
              <strong>Total:</strong> ${selectedOrder.total.toFixed(2)}
            </p>
            <p>
              <strong>Status:</strong> {selectedOrder.status}
            </p>
            <h3>Items:</h3>
            <ul>
              {selectedOrder.items.map((item, index) => (
                <li key={index}>
                  {item.name} - Quantity: {item.quantity}
                </li>
              ))}
            </ul>
            <h3>Update Status:</h3>
            <Button
              onClick={() => handleStatusChange(selectedOrder.id, "Processing")}
            >
              Mark as Processing
            </Button>
            <Button
              onClick={() => handleStatusChange(selectedOrder.id, "Shipped")}
            >
              Mark as Shipped
            </Button>
            <Button
              onClick={() => handleStatusChange(selectedOrder.id, "Completed")}
            >
              Mark as Completed
            </Button>
          </div>
        )}
      </Modal>
    </div>
  );
};

export default Orders;
