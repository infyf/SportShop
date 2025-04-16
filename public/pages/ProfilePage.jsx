import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { User, Upload, ShoppingBag, Settings, Edit, Save, X, AlertTriangle } from "lucide-react"
import { useAuth } from "../components/context/AuthContext"

const ProfilePage = () => {
  const { currentUser, isAuthenticated, updateProfile, logout } = useAuth()
  const navigate = useNavigate()
  const [activeTab, setActiveTab] = useState("profile")
  const [isEditing, setIsEditing] = useState(false)
  const [formData, setFormData] = useState({
    firstName: currentUser?.firstName || "",
    lastName: currentUser?.lastName || "",
    email: currentUser?.email || "",
    phone: currentUser?.phone || "",
    address: currentUser?.address || "",
  })
  const fileInputRef = useRef(null)

  const [notification, setNotification] = useState({ show: false, message: "", type: "" })
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [deleteConfirm, setDeleteConfirm] = useState(false)

  useEffect(() => {
    if (notification.show) {
      const timer = setTimeout(() => {
        setNotification({ show: false, message: "", type: "" })
      }, 5000)
      return () => clearTimeout(timer)
    }
  }, [notification.show])

  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <User size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Профіль недоступний</h2>
          <p className="text-gray-600 mb-6">Будь ласка, увійдіть або зареєструйтесь, щоб отримати доступ до профілю.</p>
          <button
            onClick={() => navigate("/")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Повернутися на головну
          </button>
        </div>
      </div>
    )
  }

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updateProfile({ avatar: reader.result })
          .then(() => {
            setNotification({
              show: true,
              message: "Аватар успішно оновлено",
              type: "success",
            })
          })
          .catch((error) => {
            setNotification({
              show: true,
              message: "Помилка при оновленні аватару",
              type: "error",
            })
          })
      }
      reader.readAsDataURL(file)
    }
  }

  const handleInputChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleSaveProfile = () => {
    updateProfile(formData)
      .then(() => {
        setIsEditing(false)
        setNotification({
          show: true,
          message: "Профіль успішно оновлено",
          type: "success",
        })
      })
      .catch((error) => {
        setNotification({
          show: true,
          message: "Помилка при оновленні профілю",
          type: "error",
        })
      })
  }

  const handlePasswordChange = (e) => {
    const { name, value } = e.target
    setPasswordData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const handleChangePassword = () => {
    if (!passwordData.currentPassword || !passwordData.newPassword || !passwordData.confirmPassword) {
      setNotification({
        show: true,
        message: "Будь ласка, заповніть всі поля",
        type: "error",
      })
      return
    }

    if (passwordData.newPassword !== passwordData.confirmPassword) {
      setNotification({
        show: true,
        message: "Новий пароль та підтвердження не співпадають",
        type: "error",
      })
      return
    }

    updateProfile({ password: passwordData.newPassword })
      .then(() => {
        setNotification({
          show: true,
          message: "Пароль успішно змінено!",
          type: "success",
        })
        setPasswordData({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        })
      })
      .catch((error) => {
        setNotification({
          show: true,
          message: "Помилка при зміні паролю",
          type: "error",
        })
      })
  }

  const handleDeleteAccount = () => {
    if (!deleteConfirm) {
      setDeleteConfirm(true)
      return
    }

    logout()
      .then(() => {
        setNotification({
          show: true,
          message: "Ваш акаунт було успішно видалено",
          type: "success",
        })
        setTimeout(() => {
          navigate("/")
        }, 2000)
      })
      .catch((error) => {
        setNotification({
          show: true,
          message: "Помилка при видаленні акаунту",
          type: "error",
        })
      })
  }

  const renderProfileTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      {notification.show && activeTab === "profile" && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "error" && <AlertTriangle size={20} />}
          {notification.message}
        </div>
      )}

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Особиста інформація</h2>
        {!isEditing ? (
          <button
            onClick={() => setIsEditing(true)}
            className="flex items-center gap-2 text-blue-600 hover:text-blue-800"
          >
            <Edit size={18} />
            Редагувати
          </button>
        ) : (
          <div className="flex gap-2">
            <button
              onClick={handleSaveProfile}
              className="flex items-center gap-1 bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600"
            >
              <Save size={16} />
              Зберегти
            </button>
            <button
              onClick={() => {
                setIsEditing(false)
                setFormData({
                  firstName: currentUser?.firstName || "",
                  lastName: currentUser?.lastName || "",
                  email: currentUser?.email || "",
                  phone: currentUser?.phone || "",
                  address: currentUser?.address || "",
                })
              }}
              className="flex items-center gap-1 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
            >
              <X size={16} />
              Скасувати
            </button>
          </div>
        )}
      </div>

      {isEditing ? (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-1">Ім'я</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Прізвище</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="w-full p-2 border rounded"
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              disabled
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Телефон</label>
            <input
              type="tel"
              name="phone"
              value={formData.phone}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
            />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Адреса</label>
            <textarea
              name="address"
              value={formData.address}
              onChange={handleInputChange}
              className="w-full p-2 border rounded"
              rows={3}
            />
          </div>
        </div>
      ) : (
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-gray-500">Ім'я</p>
              <p className="font-medium">{currentUser.firstName || "Не вказано"}</p>
            </div>
            <div>
              <p className="text-sm text-gray-500">Прізвище</p>
              <p className="font-medium">{currentUser.lastName || "Не вказано"}</p>
            </div>
          </div>
          <div>
            <p className="text-sm text-gray-500">Email</p>
            <p className="font-medium">{currentUser.email}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Телефон</p>
            <p className="font-medium">{currentUser.phone || "Не вказано"}</p>
          </div>
          <div>
            <p className="text-sm text-gray-500">Адреса</p>
            <p className="font-medium">{currentUser.address || "Не вказано"}</p>
          </div>
        </div>
      )}
    </div>
  )

  const renderPurchaseHistoryTab = () => {
    if (!currentUser.purchaseHistory || currentUser.purchaseHistory.length === 0) {
      return (
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
          <ShoppingBag size={64} className="mx-auto text-gray-300 mb-4" />
          <h2 className="text-xl font-bold text-gray-900 mb-2">Історія покупок порожня</h2>
          <p className="text-gray-600 mb-6">Ви ще не зробили жодної покупки.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Перейти до каталогу
          </button>
        </div>
      )
    }

    return (
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Історія покупок</h2>
        <div className="space-y-4">
          {currentUser.purchaseHistory.map((purchase, index) => (
            <div key={index} className="border rounded-lg p-4">
              <div className="flex justify-between items-center mb-2">
                <p className="font-medium">Замовлення #{purchase.orderId}</p>
                <p className="text-gray-500 text-sm">{new Date(purchase.date).toLocaleDateString()}</p>
              </div>
              <div className="space-y-2">
                {purchase.items.map((item, idx) => (
                  <div key={idx} className="flex items-center gap-4">
                    <img
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-16 h-16 object-cover rounded"
                    />
                    <div className="flex-1">
                      <p className="font-medium">{item.name}</p>
                      <p className="text-sm text-gray-600">Кількість: {item.quantity}</p>
                    </div>
                    <p className="font-bold">{item.price} ₴</p>
                  </div>
                ))}
              </div>
              <div className="mt-4 pt-4 border-t flex justify-between">
                <p className="font-medium">Загальна сума:</p>
                <p className="font-bold">{purchase.totalAmount} ₴</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    )
  }

  const renderSettingsTab = () => (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-2xl font-bold mb-6">Налаштування</h2>

      {notification.show && activeTab === "settings" && (
        <div
          className={`mb-6 p-4 rounded-lg flex items-center gap-2 ${
            notification.type === "success" ? "bg-green-100 text-green-800" : "bg-red-100 text-red-800"
          }`}
        >
          {notification.type === "error" && <AlertTriangle size={20} />}
          {notification.message}
        </div>
      )}

      <div className="space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-2">Зміна паролю</h3>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Поточний пароль</label>
              <input
                type="password"
                name="currentPassword"
                value={passwordData.currentPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Новий пароль</label>
              <input
                type="password"
                name="newPassword"
                value={passwordData.newPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-1">Підтвердження паролю</label>
              <input
                type="password"
                name="confirmPassword"
                value={passwordData.confirmPassword}
                onChange={handlePasswordChange}
                className="w-full p-2 border rounded"
              />
            </div>
            <button
              onClick={handleChangePassword}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors"
            >
              Змінити пароль
            </button>
          </div>
        </div>

        <div className="pt-6 border-t">
          <h3 className="text-lg font-medium mb-2 text-red-600">Видалення акаунту</h3>
          <p className="text-gray-600 mb-4">
            Увага! Видалення акаунту призведе до втрати всіх ваших даних та історії покупок. Ця дія незворотня.
          </p>
          {deleteConfirm ? (
            <div className="space-y-4">
              <div className="bg-red-50 border border-red-200 rounded-lg p-4 text-red-800">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle size={20} />
                  <span className="font-bold">Ви впевнені?</span>
                </div>
                <p>Це назавжди видалить ваш акаунт та всі пов'язані з ним дані.</p>
              </div>
              <div className="flex gap-3">
                <button
                  onClick={handleDeleteAccount}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
                >
                  Так, видалити мій акаунт
                </button>
                <button
                  onClick={() => setDeleteConfirm(false)}
                  className="bg-gray-200 text-gray-800 px-4 py-2 rounded hover:bg-gray-300 transition-colors"
                >
                  Скасувати
                </button>
              </div>
            </div>
          ) : (
            <button
              onClick={handleDeleteAccount}
              className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
            >
              Видалити акаунт
            </button>
          )}
        </div>
      </div>
    </div>
  )

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="md:col-span-1">
          <div className="bg-white rounded-lg shadow-md p-6 text-center">
            <div className="relative inline-block mb-4">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden bg-gray-200">
                {currentUser.avatar ? (
                  <img
                    src={currentUser.avatar || "/placeholder.svg"}
                    alt={currentUser.name}
                    className="w-full h-full object-cover"
                  />
                ) : (
                  <User size={128} className="w-full h-full p-6 text-gray-400" />
                )}
              </div>
              <button
                onClick={() => fileInputRef.current.click()}
                className="absolute bottom-0 right-0 bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700"
                title="Завантажити аватар"
              >
                <Upload size={16} />
              </button>
              <input type="file" ref={fileInputRef} onChange={handleAvatarUpload} className="hidden" accept="image/*" />
            </div>
            <h2 className="text-xl font-bold">{currentUser.name}</h2>
            <p className="text-gray-600 mb-6">{currentUser.email}</p>

            <div className="space-y-2">
              <button
                onClick={() => setActiveTab("profile")}
                className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                  activeTab === "profile" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                <User size={18} />
                Профіль
              </button>
              <button
                onClick={() => setActiveTab("purchases")}
                className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                  activeTab === "purchases" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                <ShoppingBag size={18} />
                Історія покупок
              </button>
              <button
                onClick={() => setActiveTab("settings")}
                className={`w-full text-left px-4 py-2 rounded flex items-center gap-2 ${
                  activeTab === "settings" ? "bg-blue-50 text-blue-600" : "hover:bg-gray-100"
                }`}
              >
                <Settings size={18} />
                Налаштування
              </button>
            </div>
          </div>
        </div>

        <div className="md:col-span-3">
          {activeTab === "profile" && renderProfileTab()}
          {activeTab === "purchases" && renderPurchaseHistoryTab()}
          {activeTab === "settings" && renderSettingsTab()}
        </div>
      </div>
    </div>
  )
}

export default ProfilePage
