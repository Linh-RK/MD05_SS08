import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Input, Button, message, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import { updateProfile, fetchProfile } from "../store/userSlice";

const Profile = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.profile);
  const loading = useSelector((state) => state.user.loading);
  const [form] = Form.useForm();

  useEffect(() => {
    dispatch(fetchProfile());
  }, [dispatch]);

  useEffect(() => {
    if (user) {
      form.setFieldsValue(user);
    }
  }, [user, form]);

  const onFinish = (values) => {
    dispatch(updateProfile(values))
      .unwrap()
      .then(() => {
        message.success("Profile updated successfully");
      })
      .catch((error) => {
        message.error("Failed to update profile: " + error.message);
      });
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-6">My Profile</h1>
      <Form
        form={form}
        layout="vertical"
        onFinish={onFinish}
        initialValues={user}
      >
        <Form.Item
          name="fullName"
          label="Full Name"
          rules={[{ required: true, message: "Please input your full name!" }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Please input your email!" },
            { type: "email", message: "Please enter a valid email!" },
          ]}
        >
          <Input />
        </Form.Item>
        <Form.Item name="phone" label="Phone">
          <Input />
        </Form.Item>
        <Form.Item name="avatar" label="Avatar">
          <Upload
            name="avatar"
            listType="picture"
            maxCount={1}
            beforeUpload={() => false}
          >
            <Button icon={<UploadOutlined />}>Click to upload</Button>
          </Upload>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Update Profile
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Profile;
