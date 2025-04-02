

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

  // функція для реєстрації користувача
  const register = (email, password, name) => {
    // тут повинен бути запит до Апі Владе
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
    }

    setCurrentUser(newUser)
    return Promise.resolve(newUser)
  }

  
  const login = (email, password) => {
    // також запит 
    // тест та просто перевірка  чи є користувач з таким email в localStorage
    const savedUser = localStorage.getItem("user")
    const user = savedUser ? JSON.parse(savedUser) : null

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

  // функція для додавання покупки в історію
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

