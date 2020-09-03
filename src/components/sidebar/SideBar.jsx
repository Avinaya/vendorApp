import React from "react";
import "./SideBar.scss";
import { NavLink } from "react-router-dom";
import AddProduct from "../addProduct/AddProduct";

export default function SideBar() {
  return (
    <React.Fragment>
      <div className="sidebar">
        <div className="sidebar-heading">
          <span className="sidebar-heading-part1">Sapta</span>
          <span className="sidebar-heading-part2">Bazar</span>
        </div>
        <div className="sidebar-nav">
          <NavLink
          
            className="link"
            activeStyle={{ color: "#13BEBB" }}
            exact to="/"
          >
            <i className="fa fa-home sidebar-nav-icon"></i>
            <span className="sidebar-nav-text">Home</span>
          </NavLink>
        </div>
        <div className="sidebar-nav">
          <NavLink
            className="link"
            activeStyle={{ color: "#13BEBB" }}
            to="/product"
          >
            <i className="fa fa-cube sidebar-nav-icon"></i>
            <span className="sidebar-nav-text">Product</span>
          </NavLink>
        </div>
      </div>
      <div className="page">
        <div className="main">
          <div className="main-navbar">header</div>
          <AddProduct/>

        </div>
      </div>
    </React.Fragment>
  );
}
