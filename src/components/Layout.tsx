import React from "react";
import { LayoutProps } from "../types";

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <div className="layout-container">
      <h1 className="app-title">Welcome to Fruits Jar App</h1>
      <div className="main-content">{children}</div>
    </div>
  );
};

export default Layout;
