import { createContext, useContext, useState, useEffect } from "react"

const AuthContext = createContext()


export const useAuth = () => {
  return useContext(AuthContext)
}


export const AuthProvider = ({ children }) => {

  const [currentUser, setCurrentUser] = useState(() => {
    const savedUser = localStorage.getItem("user")
    return savedUser ? JSON.parse(savedUser) : null
  })

  const [loading, setLoading] = useState(true)

 
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem("user", JSON.stringify(currentUser))
    } else {
      localStorage.removeItem("user")
    }
    setLoading(false)
  }, [currentUser])


  const register = (email, password, name) => {
  
    const newUser = {
      id: Date.now().toString(),
      email,
      name,
      avatar: null,
      firstName: "",
      lastName: "",
      phone: "",
      address: "",
      purchaseHistory: [],
      createdAt: new Date().toISOString(),
      role: "user", 
    }

    setCurrentUser(newUser)
    return Promise.resolve(newUser)
  }

 
  const login = (email, password) => {
    //  тут був и запит до API
  
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null

    // адмін панель для  адміністратор
    if (email === "admin@admin.com" && password === "admin") {
      const adminUser = {
        id: "admin1",
        email: "admin@admin.com",
        name: "Адміністратор",
        avatar: null,
        firstName: "Адмін",
        lastName: "Системи",
        phone: "+380991234567",
        address: "м. Київ, вул. Адміністративна, 1",
        purchaseHistory: [],
        createdAt: "2025-01-01T00:00:00",
        role: "admin",
      }
      setCurrentUser(adminUser)
      return Promise.resolve(adminUser)
    }

    if (user && user.email === email) {
      setCurrentUser(user)
      return Promise.resolve(user)
    }

    return Promise.reject(new Error("Невірний email або пароль"))
  }


  const logout = () => {
    setCurrentUser(null)
    return Promise.resolve()
  }

  const updateProfile = (userData) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }))
    return Promise.resolve()
  }


  const addPurchase = (purchase) => {
    setCurrentUser((prevUser) => ({
      ...prevUser,
      purchaseHistory: [purchase, ...(prevUser.purchaseHistory || [])],
    }))
    return Promise.resolve()
  }


  const value = {
    currentUser,
    loading,
    register,
    login,
    logout,
    updateProfile,
    addPurchase,
    isAuthenticated: !!currentUser,
  }

  return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}

export default AuthProvider
