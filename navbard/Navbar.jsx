import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../Auth/AuthForm";

const Navbar = () => {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Каталог товарів", path: "/shop" },
    { label: "Розміщення товарів", path: "/aaa" },
    
  ];

  const handleAuthFormToggle = () => {
    setAuthFormVisible(!isAuthFormVisible);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <h1>SportSpider</h1>
        <ul style={{ display: "flex", listStyle: "none", padding: 0, margin: 0 }}>
          {navItems.map((item, index) => (
            <li key={index} style={{ margin: "0 10px" }}>
              <Link to={item.path}>{item.label}</Link>
            </li>
          ))}
        </ul>
        <div>
          {isAuthenticated ? (
            <button onClick={handleLogout}>Вийти</button>
          ) : (
            <button onClick={handleAuthFormToggle}>Вхід/Реєстрація</button>
          )}
        </div>
      </div>
      {isAuthFormVisible && <AuthForm closeForm={handleAuthFormToggle} setIsAuthenticated={setIsAuthenticated} />}
    </div>
  );
};

export default Navbar;
