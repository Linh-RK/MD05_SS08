import React, { useState, useEffect } from "react";
import { Table, Button, Modal, Form, Input, message } from "antd";
import {
  getCategoriesAPI,
  createCategoryAPI,
  updateCategoryAPI,
  deleteCategoryAPI,
} from "../../api";

const Categories = () => {
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [form] = Form.useForm();
  const [editingCategory, setEditingCategory] = useState(null);
  const [pagination, setPagination] = useState({
    current: 1,
    pageSize: 10,
    total: 0,
  });

  const fetchCategories = async (page = 1, pageSize = 10) => {
    setLoading(true);
    try {
      const response = await getCategoriesAPI(page, pageSize);
      setCategories(response.data);
      setPagination({
        ...pagination,
        current: page,
        total: response.total,
      });
    } catch (error) {
      message.error("Failed to fetch categories");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCategories();
  }, []);

  const handleTableChange = (pagination) => {
    fetchCategories(pagination.current, pagination.pageSize);
  };

  const showModal = (category = null) => {
    setEditingCategory(category);
    if (category) {
      form.setFieldsValue(category);
    } else {
      form.resetFields();
    }
    setIsModalVisible(true);
  };

  const handleOk = async () => {
    try {
      const values = await form.validateFields();
      if (editingCategory) {
        await updateCategoryAPI(editingCategory.id, values);
        message.success("Category updated successfully");
      } else {
        await createCategoryAPI(values);
        message.success("Category created successfully");
      }
      setIsModalVisible(false);
      fetchCategories(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to save category");
    }
  };

  const handleDelete = async (id) => {
    try {
      await deleteCategoryAPI(id);
      message.success("Category deleted successfully");
      fetchCategories(pagination.current, pagination.pageSize);
    } catch (error) {
      message.error("Failed to delete category");
    }
  };

  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Description",
      dataIndex: "description",
      key: "description",
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
      <h1>Categories Management</h1>
      <Button
        onClick={() => showModal()}
        type="primary"
        style={{ marginBottom: 16 }}
      >
        Add Category
      </Button>
      <Table
        columns={columns}
        dataSource={categories}
        rowKey="id"
        pagination={pagination}
        loading={loading}
        onChange={handleTableChange}
      />
      <Modal
        title={editingCategory ? "Edit Category" : "Add Category"}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={() => setIsModalVisible(false)}
      >
        <Form form={form} layout="vertical">
          <Form.Item name="name" label="Name" rules={[{ required: true }]}>
            <Input />
          </Form.Item>
          <Form.Item name="description" label="Description">
            <Input.TextArea />
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
};

export default Categories;
