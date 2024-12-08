import React from "react";
import Header from "./Header";
import Menu from "./Menu";

export default function AdminLayout() {
  return (
    <div>
      <Header />
      <div>
        <Menu />
        <h3>Content</h3>
      </div>
    </div>
  );
}
