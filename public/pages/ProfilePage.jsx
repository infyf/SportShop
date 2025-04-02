
import { useNavigate } from "react-router-dom"
import { ShoppingBag } from "lucide-react"
import { useAuth } from "../components/context/AuthContext"

const ProfilePage = () => {
  const { currentUser, isAuthenticated } = useAuth()
  const navigate = useNavigate()

  // якщо користувач не авторизований, повідомлення
  if (!isAuthenticated) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="bg-white rounded-lg shadow-md p-8 text-center">
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

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-lg shadow-md p-6 mb-6">
        <p className="text-xl font-bold">
          Тут буде профіль користувача, можливість додавати аватарку, змінювати особисту інформацію та видаляти акаунт.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold mb-6">Історія покупок</h2>

        {!currentUser.purchaseHistory || currentUser.purchaseHistory.length === 0 ? (
          <div className="text-center py-8">
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
        ) : (
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
        )}
      </div>
    </div>
  )
}

export default ProfilePage
