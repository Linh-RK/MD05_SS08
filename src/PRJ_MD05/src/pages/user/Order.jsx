import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Table, Tag } from "antd";
import { fetchOrders } from "../store/orderSlice";
import moment from "moment";

const Orders = () => {
  const dispatch = useDispatch();
  const orders = useSelector((state) => state.orders.items);
  const loading = useSelector((state) => state.orders.loading);

  useEffect(() => {
    dispatch(fetchOrders());
  }, [dispatch]);

  const columns = [
    {
      title: "Order ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Date",
      dataIndex: "createdAt",
      key: "createdAt",
      render: (date) => moment(date).format("YYYY-MM-DD HH:mm:ss"),
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
  ];

  const expandedRowRender = (record) => {
    const columns = [
      { title: "Product", dataIndex: "name", key: "name" },
      { title: "Quantity", dataIndex: "quantity", key: "quantity" },
      {
        title: "Price",
        dataIndex: "price",
        key: "price",
        render: (price) => `$${price.toFixed(2)}`,
      },
    ];

    return (
      <Table columns={columns} dataSource={record.items} pagination={false} />
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Orders</h1>
      <Table
        columns={columns}
        dataSource={orders}
        rowKey="id"
        loading={loading}
        expandable={{ expandedRowRender }}
      />
    </div>
  );
};

export default Orders;
