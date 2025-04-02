
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

  const { login, register } = useAuth()

  const handleInputChange = (setter) => (e) => setter(e.target.value)

  const resetFormState = () => {
    setEmail("")
    setPassword("")
    setConfirmPassword("")
    setName("")
    setError("")
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

  return (
    <div className={styles["auth-form-container"]}>
      <div className={styles["auth-modal"]}>
        <div className={styles["auth-header"]}>
          <button onClick={closeForm} className={styles["close-button"]}>
            Закрити
          </button>
        </div>
        <div className={styles["auth-content"]}>
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
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    placeholder="Пароль"
                    disabled={loading}
                  />
                </div>
                <div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Завантаження..." : "Увійти"}
                  </button>
                </div>
              </form>
              <div className={styles["switch-mode"]}>
                <button onClick={handleGoToRegister} disabled={loading}>
                  Зареєструватися
                </button>
              </div>
            </div>
          ) : (
            <div>
              <h2>Реєстрація</h2>
              <form onSubmit={handleRegister}>
                <div>
                  <input
                    type="text"
                    value={name}
                    onChange={handleInputChange(setName)}
                    placeholder="Ім'я"
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="email"
                    value={email}
                    onChange={handleInputChange(setEmail)}
                    placeholder="E-mail"
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={password}
                    onChange={handleInputChange(setPassword)}
                    placeholder="Пароль"
                    disabled={loading}
                  />
                </div>
                <div>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={handleInputChange(setConfirmPassword)}
                    placeholder="Підтвердження паролю"
                    disabled={loading}
                  />
                </div>
                <div>
                  <button type="submit" disabled={loading}>
                    {loading ? "Завантаження..." : "Зареєструватися"}
                  </button>
                </div>
              </form>
              <div className={styles["switch-mode"]}>
                <button onClick={handleGoToLogin} disabled={loading}>
                  Увійти
                </button>
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

