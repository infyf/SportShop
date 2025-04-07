import { useState } from "react"
import styles from "./authForm.module.css"
import { useAuth } from "../context/AuthContext"

const AuthForm = ({ closeForm }) => {
  const [isRegistering, setIsRegistering] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const [name, setName] = useState("")
  const [error, setError] = useState("")
  const [loading, setLoading] = useState(false)
  const [changePassword, setChangePass] = useState("")
  const { login, register } = useAuth()

  const handleInputChange = (setter) => (e) => setter(e.target.value)

  const resetFormState = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setError("")
    setChangePass("")
  }

  const handleGoToRegister = () => {
    resetFormState()
    setIsRegistering(true)
  }

  const handleGoToLogin = () => {
    resetFormState()
    setIsRegistering(false)
  }

  const handleLogin = async (e) => {
    e.preventDefault()
    if (!email || !password) {
      setError("Будь ласка, заповніть всі поля.")
      return
    }

    setLoading(true)
    try {
      await login(email, password)
      resetFormState()
      closeForm()
    } catch (error) {
      setError(error.message || "Помилка входу. Перевірте ваші дані.")
    } finally {
      setLoading(false)
    }
  }

  const handleRegister = async (e) => {
    e.preventDefault()
    if (!email || !password || !confirmPassword || !name) {
      setError("Будь ласка, заповніть всі поля.")
      return
    }
    if (password !== confirmPassword) {
      setError("Паролі не співпадають.")
      return
    }

    setLoading(true)
    try {
      await register(email, password, name)
      resetFormState()
      setIsRegistering(false)
      closeForm()
    } catch (error) {
      setError(error.message || "Помилка реєстрації. Спробуйте ще раз.")
    } finally {
      setLoading(false)
    }
  }

  // Додати до state:
const [showPasswordChange, setShowPasswordChange] = useState(false)

// Функція для підтвердження новго паролю:
const handleChangePassword = async () => {
  if (!email || !changePassword) {
    setError("Введіть e-mail і новий пароль.")
    return
  }

  try {
    const response = await fetch("/api/change-password", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email, newPwd: changePassword }) // ⚠️ змінити згідно з API
    })

    const data = await response.json()
    if (response.ok) {
      alert("Пароль успішно змінено.")
      setChangePass("")
      setShowPasswordChange(false)
    } else {
      setError(data.message || "Помилка при зміні паролю.")
    }
  } catch (err) {
    setError("Серверна помилка")
  }
}


  const handleDeleteAccount = async () => {
    if (!window.confirm("Ви впевнені, що хочете видалити акаунт?")) return
    try {
      const response = await fetch("/api/delete-account", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email })
      })

      const data = await response.json()
      if (response.ok) {
        alert("Акаунт успішно видалено.")
        resetFormState()
        closeForm()
      } else {
        setError(data.message || "Помилка при видаленні акаунту.")
      }
    } catch (err) {
      setError("Серверна помилка")
    }
  }

  return (
    <div className={styles["auth-form-container"]}>
      <div className={styles["auth-modal"]}>
        <div className={styles["auth-header"]}>
          <button onClick={closeForm} className={styles["close-button"]}>Закрити</button>
        </div>
        <div className={styles["auth-content"]}>
          {!isRegistering ? (
            <div>
              <h2>Вхід</h2>
              <form onSubmit={handleLogin}>
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="E-mail"
                  disabled={loading}
                />
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  placeholder="Пароль"
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Завантаження..." : "Увійти"}
                </button>
              </form>
              <div className={styles["switch-mode"]}>
  <button onClick={handleGoToRegister} disabled={loading}>
    Зареєструватися
  </button>
  <button onClick={() => setShowPasswordChange(!showPasswordChange)}>
    Змінити пароль
  </button>
  <button onClick={handleDeleteAccount} className={styles["delete-account-button"]}>
    Видалити акаунт
  </button>
</div>

{showPasswordChange && (
  <div className={styles["password-change-box"]}>
    <input
      type="password"
      value={changePassword}
      onChange={(e) => setChangePass(e.target.value)}
      placeholder="Новий пароль"
      className={styles["auth-input"]}
    />
    <button onClick={handleChangePassword} className={styles["action-button"]}>
      Підтвердити зміну
    </button>
  </div>
)}

              {changePassword !== "" && (
                <div className={styles["password-change-box"]}>
                  <input
                    type="password"
                    value={changePassword}
                    onChange={(e) => setChangePass(e.target.value)}
                    placeholder="Новий пароль"
                    className={styles["auth-input"]}
                  />
                  <button onClick={handleChangePassword} className={styles["action-button"]}>Підтвердити зміну</button>
                </div>
              )}
            </div>
          ) : (
            <div>
              <h2>Реєстрація</h2>
              <form onSubmit={handleRegister}>
                <input
                  type="text"
                  value={name}
                  onChange={handleInputChange(setName)}
                  placeholder="Ім'я"
                  disabled={loading}
                />
                <input
                  type="email"
                  value={email}
                  onChange={handleInputChange(setEmail)}
                  placeholder="E-mail"
                  disabled={loading}
                />
                <input
                  type="password"
                  value={password}
                  onChange={handleInputChange(setPassword)}
                  placeholder="Пароль"
                  disabled={loading}
                />
                <input
                  type="password"
                  value={confirmPassword}
                  onChange={handleInputChange(setConfirmPassword)}
                  placeholder="Підтвердження паролю"
                  disabled={loading}
                />
                <button type="submit" disabled={loading}>
                  {loading ? "Завантаження..." : "Зареєструватися"}
                </button>
              </form>
              <div className={styles["switch-mode"]}>
                <button onClick={handleGoToLogin} disabled={loading}>Увійти</button>
              </div>
            </div>
          )}
          {error && (
            <div className={styles["auth-error"]}>
              <p>{error}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default AuthForm
