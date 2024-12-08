import React from "react";
import { Layout as AntLayout, Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const { Header, Content, Footer, Sider } = AntLayout;

const Layout = ({ children }) => {
  const location = useLocation();
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const user = useSelector((state) => state.auth.user);

  const isAdmin = user && user.role === "admin";

  const adminMenuItems = [
    { key: "/admin", label: "Dashboard", link: "/admin" },
    { key: "/admin/users", label: "Users", link: "/admin/users" },
    {
      key: "/admin/categories",
      label: "Categories",
      link: "/admin/categories",
    },
    { key: "/admin/products", label: "Products", link: "/admin/products" },
    {
      key: "/admin/product-colors",
      label: "Product Colors",
      link: "/admin/product-colors",
    },
    {
      key: "/admin/product-sizes",
      label: "Product Sizes",
      link: "/admin/product-sizes",
    },
    { key: "/admin/orders", label: "Orders", link: "/admin/orders" },
    { key: "/admin/coupons", label: "Coupons", link: "/admin/coupons" },
    { key: "/admin/comments", label: "Comments", link: "/admin/comments" },
  ];

  const userMenuItems = [
    { key: "/", label: "Home", link: "/" },
    { key: "/products", label: "Products", link: "/products" },
    { key: "/wishlist", label: "Wishlist", link: "/wishlist" },
    { key: "/cart", label: "Cart", link: "/cart" },
    { key: "/profile", label: "Profile", link: "/profile" },
    { key: "/orders", label: "Orders", link: "/orders" },
  ];

  const menuItems = isAdmin ? adminMenuItems : userMenuItems;

  return (
    <AntLayout style={{ minHeight: "100vh" }}>
      <Sider collapsible>
        <div className="logo" />
        <Menu theme="dark" selectedKeys={[location.pathname]} mode="inline">
          {menuItems.map((item) => (
            <Menu.Item key={item.key}>
              <Link to={item.link}>{item.label}</Link>
            </Menu.Item>
          ))}
        </Menu>
      </Sider>
      <AntLayout>
        <Header style={{ background: "#fff", padding: 0 }} />
        <Content style={{ margin: "0 16px" }}>
          <div style={{ padding: 24, background: "#fff", minHeight: 360 }}>
            {children}
          </div>
        </Content>
        <Footer style={{ textAlign: "center" }}>
          Ant Design ©2023 Created by Ant UED
        </Footer>
      </AntLayout>
    </AntLayout>
  );
};

export default Layout;
