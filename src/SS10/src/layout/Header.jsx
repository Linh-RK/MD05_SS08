import React from "react";
import Menu from "./Menu";
import { Outlet } from "react-router-dom";

export default function Header() {
  return (
    <>
      <header>
        <Header></Header>
      </header>
      <Menu></Menu>
      <Outlet></Outlet>
    </>
  );
}
