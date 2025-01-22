import React, { useState } from "react";
import { Link } from "react-router-dom";
import AuthForm from "../Auth/AuthForm";
import styles from './navbar.module.css'; // Підключений стиль

const Navbar = () => {
  const [isAuthFormVisible, setAuthFormVisible] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const navItems = [
    { label: "Home", path: "/" },
    { label: "Каталог товарів", path: "/shop" },
    { label: "Розміщення товарів", path: "/add-products" },
  ];

  const handleAuthFormToggle = () => {
    setAuthFormVisible(!isAuthFormVisible);
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
  };

  return (
    <div className={styles.navbar}>
      {/* Логотип */}
      <div className={styles.logo}>
        <h1>SportSpider</h1>
      </div>
      
      {/* Навігація */}
      <ul className={styles.navList}>
        {navItems.map((item, index) => (
          <li key={index} className={styles.navItem}>
            <Link to={item.path} className={styles.navLink}>
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
      
      {/* Кнопки авторизації */}
      <div>
        {isAuthenticated ? (
          <button className={styles.authButton} onClick={handleLogout}>
            Вийти
          </button>
        ) : (
          <button className={styles.authButton} onClick={handleAuthFormToggle}>
            Вхід/Реєстрація
          </button>
        )}
      </div>

      {/* Форма авторизації */}
      {isAuthFormVisible && (
        <AuthForm
          closeForm={handleAuthFormToggle}
          setIsAuthenticated={setIsAuthenticated}
        />
      )}
    </div>
  );
};

export default Navbar;
