
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { ShoppingCart, ArrowLeft, Trash, Plus, Minus, CheckCircle } from "lucide-react"
import { useCart } from "../components/context/CartContext"
import { useAuth } from "../components/context/AuthContext"

const CartPage = () => {
  const { cart, clearCart, getCartTotal, updateQuantity, removeFromCart } = useCart()
  const { isAuthenticated, addPurchase } = useAuth()
  const navigate = useNavigate()
  const [isProcessing, setIsProcessing] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false)
  const [orderId, setOrderId] = useState("")

  if (cart.length === 0 && !isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <ShoppingCart size={64} className="mx-auto text-gray-300" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Ваш кошик порожній</h2>
          <p className="mt-2 text-gray-600">Додайте товари до кошика, щоб продовжити покупки</p>
          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Перейти до каталогу
          </Link>
        </div>
      </div>
    )
  }

  const handleCheckout = () => {
    if (!isAuthenticated) {
      // якщо користувач не авторизований,
      if (window.confirm("Для збереження історії покупок потрібно увійти в систему. Перейти до входу?")) {
        navigate("/")
        return
      }
    }

    setIsProcessing(true)

    // симулюція обробку замовлення
    setTimeout(() => {
      // генерація унікальний ID замовлення
      const newOrderId = `ORD-${Date.now().toString().slice(-6)}`
      setOrderId(newOrderId)

     
      const purchase = {
        orderId: newOrderId,
        date: new Date().toISOString(),
        items: [...cart],
        totalAmount: getCartTotal(),
        status: "completed",
      }

      // додавання замовлення до історії покупок
      if (isAuthenticated) {
        addPurchase(purchase)
      }

     
      clearCart()

      
      setIsProcessing(false)
      setIsCompleted(true)
    }, 1000)
  }

  if (isCompleted) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center py-16 bg-white rounded-lg shadow-sm">
          <CheckCircle size={64} className="mx-auto text-green-500" />
          <h2 className="mt-4 text-2xl font-bold text-gray-900">Замовлення успішно оформлено!</h2>
          <p className="mt-2 text-gray-600">
            Дякуємо за покупку. Номер вашого замовлення: <span className="font-bold">{orderId}</span>
          </p>

          {isAuthenticated && (
            <div className="mt-4">
              <p className="text-gray-600">
                Ви можете переглянути деталі замовлення в{" "}
                <Link to="/profile" className="text-blue-600 hover:underline">
                  історії покупок
                </Link>
                .
              </p>
            </div>
          )}

          <Link
            to="/catalog"
            className="mt-6 inline-flex items-center justify-center px-6 py-3 border border-transparent text-base font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700"
          >
            Продовжити покупки
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Кошик</h1>
        <Link to="/catalog" className="flex items-center text-blue-600 hover:text-blue-800">
          <ArrowLeft size={16} className="mr-1" />
          Продовжити покупки
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        <div className="md:col-span-2 bg-white rounded-lg shadow-sm p-6">
          <div className="flex justify-between items-center pb-4 border-b">
            <h2 className="font-medium">Товари в кошику ({cart.length})</h2>
            <button onClick={clearCart} className="flex items-center text-red-600 hover:text-red-800">
              <Trash size={16} className="mr-1" />
              Очистити кошик
            </button>
          </div>

          <div className="divide-y">
            {cart.map((item) => (
              <div key={item.id} className="flex items-center py-4 border-b">
                <div className="w-20 h-20 flex-shrink-0">
                  <img
                    src={item.image || "/placeholder.svg"}
                    alt={item.name}
                    className="w-full h-full object-cover rounded"
                  />
                </div>

                <div className="ml-4 flex-1">
                  <h3 className="font-medium text-gray-800">{item.name}</h3>
                  <p className="text-gray-600 text-sm">{item.price} ₴</p>
                </div>

                <div className="flex items-center">
                  <button
                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Minus size={16} />
                  </button>

                  <span className="mx-2 w-8 text-center">{item.quantity}</span>

                  <button
                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                    className="p-1 rounded-full hover:bg-gray-100"
                  >
                    <Plus size={16} />
                  </button>
                </div>

                <div className="ml-4 font-medium">{(item.price * item.quantity).toFixed(2)} ₴</div>

                <button
                  onClick={() => removeFromCart(item.id)}
                  className="ml-4 p-1 text-red-500 hover:bg-red-50 rounded-full"
                >
                  <Trash size={18} />
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white rounded-lg shadow-sm p-6 h-fit">
          <h2 className="font-medium mb-4 pb-4 border-b">Підсумок замовлення</h2>

          <div className="space-y-3 mb-6">
            <div className="flex justify-between">
              <span className="text-gray-600">Товарів:</span>
              <span>{cart.length}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-gray-600">Сума:</span>
              <span>{getCartTotal().toFixed(2)} ₴</span>
            </div>
          </div>

          <div className="pt-4 border-t">
            <div className="flex justify-between font-bold text-lg mb-6">
              <span>Загальна сума:</span>
              <span>{getCartTotal().toFixed(2)} ₴</span>
            </div>

            <button
              onClick={handleCheckout}
              disabled={isProcessing}
              className="w-full block text-center bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition-colors disabled:bg-blue-400"
            >
              {isProcessing ? (
                <>
                  <span className="inline-block mr-2 h-4 w-4 border-2 border-white border-t-transparent rounded-full animate-spin"></span>
                  Обробка...
                </>
              ) : (
                "Оформити замовлення"
              )}
            </button>

            {!isAuthenticated && (
              <p className="mt-4 text-sm text-gray-600 text-center">
                Увійдіть в систему, щоб зберегти історію замовлень у вашому профілі
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default CartPage

