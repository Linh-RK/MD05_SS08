import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  DatePicker,
  message,
} from "antd";
import {
  getCouponsAPI,
  createCouponAPI,
  updateCouponAPI,
  deleteCouponAPI,
} from "../../api";
import moment from "moment";

const Coupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCoupon, setEditingCoupon] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCoupons = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getCouponsAPI(page, pageSize);
      setCoupons(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.total,
      });
    } catch (error) {
      message.error("Failed to fetch coupons");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCoupons();
  }, []);

  const handleTableChange = (pagination) => {
    fetchCoupons(pagination.current, pagination.pageSize);
  };

  const showModal = (coupon = null) => {
    setEditingCoupon(coupon);
    if (coupon) {
      form.setFieldsValue({
        ...coupon,
        expiryDate: moment(coupon.expiryDate),
      });
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      const couponData = {
        ...values,
        expiryDate: values.expiryDate.format("YYYY-MM-DD"),
      };
      if (editingCoupon) {
        await updateCouponAPI(editingCoupon.id, couponData);
        message.success("Coupon updated successfully");
      } else {
        await createCouponAPI(couponData);
        message.success("Coupon created successfully");
      }
      setIsModalVisible(false);
      fetchCoupons(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to save coupon");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCouponAPI(id);
      message.success("Coupon deleted successfully");
      fetchCoupons(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to delete coupon");
    }
  };

  const columns = [
    {
      title: "Code",
      dataIndex: "code",
      key: "code",
    },
    {
      title: "Discount",
      dataIndex: "discount",
      key: "discount",
      render: (discount) => `${discount}%`,
    },
    {
      title: "Expiry Date",
      dataIndex: "expiryDate",
      key: "expiryDate",
      render: (date) => moment(date).format("YYYY-MM-DD"),
    },
    {
      title: "Actions",
      key: "actions",
      render: (_, record) => (
        <>
          <Button onClick={() => showModal(record)}>Edit</Button>
          <Button onClick={() => handleDelete(record.id)} danger>
            Delete
          </Button>
        </>
      ),
    },
  ];

  return (
    <div>
      <h1>Coupons Management</h1>
      <Button
        onClick={() => showModal()}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Coupon
      </Button>
      <Table
        columns={columns}
        dataSource={coupons}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingCoupon ? "Edit Coupon" : "Add Coupon"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="code" label="Code" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item
            name="discount"
            label="Discount (%)"
            rules={[{ required: true }]}
          >
            <InputNumber min={0} max={100} />
          </Form.Item>
          <Form.Item
            name="expiryDate"
            label="Expiry Date"
            rules={[{ required: true }]}
          >
            <DatePicker />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Coupons;
