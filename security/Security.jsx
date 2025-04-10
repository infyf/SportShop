import React, { useEffect, useState } from "react";
import jwt_decode from "react"; // переконайся, що ця бібліотека встановлена
// import ActiveUsersLog from "../Journal security/JournalUsersActions";
// import ActiveUsersLog from "./journalUsersActions"; 
import UserStatus from "./UserStatus";
const Security = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [showLogin, setShowLogin] = useState(true);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  // Перевірка токена
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded = jwt_decode(token);
        if (decoded.role === "admin") {
          setIsAuthenticated(true);
        } else {
          window.location.href = "/non-authorized";
        }
      } catch {
        setIsAuthenticated(false);
      }
    }
  }, []);

  // Форма входу
  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.reload(); // перезавантажити, щоб перейти до панелі
      } else {
        setMessage("Невірні дані для входу");
      }
    } catch {
      setMessage("Помилка входу");
    }
  };

  // Форма реєстрації
  const handleRegister = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch("/api/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });
      const data = await res.json();
      setMessage(data.message || "Реєстрація успішна, тепер увійдіть");
    } catch {
      setMessage("Помилка реєстрації");
    }
  };

  // Якщо не авторизований, показуємо форми
  if (!isAuthenticated) { 
   
    return ( 
     
      <div className="min-h-screen flex flex-col items-center justify-center bg-gray-100 px-4">
        <div className="bg-white shadow-md rounded px-8 py-6 w-full max-w-md">
          <h2 className="text-2xl font-bold mb-4 text-center">
            {showLogin ? "Вхід" : "Реєстрація"}
          </h2>
          <form onSubmit={showLogin ? handleLogin : handleRegister}>
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="w-full mb-3 p-2 border rounded"
            />
            <input
              type="password"
              placeholder="Пароль"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="w-full mb-3 p-2 border rounded"
            />
             <UserStatus />
            <button className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600">
              {showLogin ? "Увійти" : "Зареєструватися"}
            </button>
          </form>
          {message && <p className="mt-2 text-red-600 text-center">{message}</p>}
          <p className="mt-4 text-center">
            {showLogin ? "Ще не маєте акаунта?" : "Вже маєте акаунт?"}{" "}
            <button
              className="text-blue-600 underline"
              onClick={() => setShowLogin(!showLogin)}
            >
              {showLogin ? "Зареєструватися" : "Увійти"}
            </button>
          </p> 
          
        </div>
      </div>  
     
     
    );
  }

  // Якщо авторизований — основна панель (можеш вставити сюди свій код далі)
  return (
    <div className="min-h-screen flex items-center justify-center bg-green-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold text-green-700">Ласкаво просимо до панелі безпеки!</h1>
        <button
          onClick={() => {
            localStorage.removeItem("token");
            window.location.reload();
          }}
          className="mt-4 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
        >
          Вийти
        </button>
      </div>
    </div>
  );
};

export default Security;
