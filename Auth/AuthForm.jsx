import React, { useState } from "react";
import styles from './authForm.module.css';

const AuthForm = ({ closeForm }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const handleInputChange = (setter) => (e) => setter(e.target.value);

  const resetFormState = () => {
    setEmail("");
    setPassword("");
    setConfirmPassword("");
    setError("");
  };

  const handleGoToRegister = () => {
    resetFormState();
    setIsRegistering(true);
  };

  const handleGoToLogin = () => {
    resetFormState();
    setIsRegistering(false);
  };

  const handleLogin = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setError("Будь ласка, заповніть всі поля.");
      return;
    }
    console.log("Вхід", { email, password });
    resetFormState();
    closeForm();
  };

  const handleRegister = (e) => {
    e.preventDefault();
    if (!email || !password || !confirmPassword) {
      setError("Будь ласка, заповніть всі поля.");
      return;
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають.");
      return;
    }
    console.log("Реєстрація", { email, password });
    resetFormState();
    setIsRegistering(false);
  };

  return (
    <div className={styles['auth-form-container']}> 
      <div className={styles['auth-modal']}> 
        <div>
          <button onClick={closeForm}>Закрити</button>
        </div>
        {!isRegistering ? (
          <div>
            <h2>Вхід</h2>
            <form onSubmit={handleLogin}>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="E-mail"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  placeholder="Пароль"
                />
              </div>
              <div>
                <button type="submit">Увійти</button>
              </div>
            </form>
            <div>
              <button onClick={handleGoToRegister}>Зареєструватися</button>
            </div>
          </div>
        ) : (
          <div>
            <h2>Реєстрація</h2>
            <form onSubmit={handleRegister}>
              <div>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="E-mail"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  placeholder="Пароль"
                />
              </div>
              <div>
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword)}
                  placeholder="Підтвердження паролю"
                />
              </div>
              <div>
                <button type="submit">Зареєструватися</button>
              </div>
            </form>
            <div>
              <button onClick={handleGoToLogin}>Увійти</button>
            </div>
          </div>
        )}
        {error && <div className={styles['auth-error']}><p>{error}</p></div>} {/* Зміна - використано новий стиль для помилок */}
      </div>
    </div>
  );
};

export default AuthForm;
