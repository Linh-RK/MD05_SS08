import React, { useState, useEffect } from "react";
import {
  Table,
  Button,
  Modal,
  Form,
  Input,
  InputNumber,
  Select,
  message,
} from "antd";
import {
  getProductsAPI,
  createProductAPI,
  updateProductAPI,
  deleteProductAPI,
  getCategoriesAPI,
} from "../../api";

const { Option } = Select;

const Products = () => {
  const [products, setProducts] = useState([]);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingProduct, setEditingProduct] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchProducts = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getProductsAPI(page, pageSize);
      setProducts(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.total,
      });
    } catch (error) {
      message.error("Failed to fetch products");
    } finally {
      setLoading(false);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategoriesAPI();
      setCategories(response.data);
    } catch (error) {
      message.error("Failed to fetch categories");
    }
  };

  useEffect(() => {
    fetchProducts();
    fetchCategories();
  }, []);

  const handleTableChange = (pagination) => {
    fetchProducts(pagination.current, pagination.pageSize);
  };

  const showModal = (product = null) => {
    setEditingProduct(product);
    if (product) {
      form.setFieldsValue(product);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingProduct) {
        await updateProductAPI(editingProduct.id, values);
        message.success("Product updated successfully");
      } else {
        await createProductAPI(values);
        message.success("Product created successfully");
      }
      setIsModalVisible(false);
      fetchProducts(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to save product");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteProductAPI(id);
      message.success("Product deleted successfully");
      fetchProducts(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to delete product");
    }
  };

  const columns = [
    {
      title: "Name",
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
      title: "Category",
      dataIndex: "category",
      key: "category",
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
      <h1>Products Management</h1>
      <Button
        onClick={() => showModal()}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Product
      </Button>
      <Table
        columns={columns}
        dataSource={products}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingProduct ? "Edit Product" : "Add Product"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="price" label="Price" rules={[{ required: true }]}>
            <InputNumber min={0} step={0.01} />
          </Form.Item>
          <Form.Item
            name="category"
            label="Category"
            rules={[{ required: true }]}
          >
            <Select>
              {categories.map((category) => (
                <Option key={category.id} value={category.id}>
                  {category.name}
                </Option>
              ))}
            </Select>
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Products;
