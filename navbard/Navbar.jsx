import { useState, useEffect } from "react"
import { Link } from "react-router-dom"
import { ShoppingCart, Star, ArrowRight, TrendingUp, Award, Clock, Users, ChevronRight } from "lucide-react"
import Slider from "../Slider/Slider"
import VideoBoard from "../components/VideoBoard/VideoBoard"
import { useCart } from "../components/context/CartContext"

function Home() {
  const [featuredProducts, setFeaturedProducts] = useState([])
  const [newArrivals, setNewArrivals] = useState([])
  const [loading, setLoading] = useState(true)
  const { addToCart } = useCart()

  useEffect(() => {
   
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        // random items
        const shuffled = [...data.products].sort(() => 0.5 - Math.random())
        setFeaturedProducts(shuffled.slice(0, 4))

      
        const newProducts = data.products.filter((product) => product.isNew).slice(0, 4)
        setNewArrivals(newProducts)

        setLoading(false)
      })
      .catch((error) => {
        console.error("Error loading products:", error)
        setLoading(false)
      })
  }, [])

  const handleAddToCart = (product) => {
    addToCart(
      {
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      },
      1,
    )
  }

  return (
    <main className="bg-gray-50">
     
      <section className="mb-12">
        <Slider />
      </section>

      {/* популярні категорії */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Популярні категорії</h2>
          <p className="mt-2 text-lg text-gray-600">Знайдіть все необхідне для активного способу життя</p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          <Link to="/category/1" className="group">
            <div className="bg-gradient-to-r from-blue-500 to-blue-600 rounded-lg p-6 text-center text-white transition-transform group-hover:scale-105">
              <img src="/placeholder.svg?height=80&width=80" alt="Взуття" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-medium">Взуття</h3>
            </div>
          </Link>
          <Link to="/category/2" className="group">
            <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-lg p-6 text-center text-white transition-transform group-hover:scale-105">
              <img src="/placeholder.svg?height=80&width=80" alt="Одяг" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-medium">Одяг</h3>
            </div>
          </Link>
          <Link to="/category/3" className="group">
            <div className="bg-gradient-to-r from-purple-500 to-purple-600 rounded-lg p-6 text-center text-white transition-transform group-hover:scale-105">
              <img src="/placeholder.svg?height=80&width=80" alt="Аксесуари" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-medium">Аксесуари</h3>
            </div>
          </Link>
          <Link to="/category/4" className="group">
            <div className="bg-gradient-to-r from-red-500 to-red-600 rounded-lg p-6 text-center text-white transition-transform group-hover:scale-105">
              <img src="/placeholder.svg?height=80&width=80" alt="Обладнання" className="w-16 h-16 mx-auto mb-4" />
              <h3 className="font-medium">Обладнання</h3>
            </div>
          </Link>
        </div>
      </section>

      {/* популярні товари */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Популярні товари</h2>
          <Link to="/catalog" className="flex items-center text-blue-600 hover:text-blue-800">
            Переглянути всі <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {featuredProducts.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/product/${product.id}`}>
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-xl font-bold">{product.price} ₴</p>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={18} className="mr-2" />В кошик
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* банер */}
      <section className="py-16 bg-gradient-to-r from-purple-600 to-blue-500 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl font-bold mb-4">Знижки до 50% на спортивний одяг</h2>
              <p className="text-lg mb-6">
                Тільки цього тижня! Не пропустіть можливість оновити свій спортивний гардероб за найкращими цінами.
              </p>
              <Link
                to="/catalog"
                className="inline-flex items-center px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-gray-100 transition-colors"
              >
                Переглянути пропозиції <ArrowRight size={16} className="ml-2" />
              </Link>
            </div>
            <div className="hidden md:block">
              <img src="/placeholder.svg?height=300&width=500" alt="Спортивний одяг" className="rounded-lg" />
            </div>
          </div>
        </div>
      </section>

      {/* відеоборд */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Тренування та поради</h2>
          <p className="mt-2 text-lg text-gray-600">Корисні відео для вашого спортивного розвитку</p>
        </div>
        <VideoBoard />
      </section>

      {/* Нові надходження */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 bg-white">
        <div className="flex justify-between items-center mb-8">
          <h2 className="text-2xl font-bold text-gray-900">Нові надходження тут треба на майбутнє додати в products.json поле dateAdded та фільтрувати продукти які:</h2>
          <Link to="/catalog" className="flex items-center text-blue-600 hover:text-blue-800">
            Переглянути всі <ChevronRight size={16} />
          </Link>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="bg-gray-100 rounded-lg p-4 animate-pulse">
                <div className="w-full h-48 bg-gray-200 rounded-md mb-4"></div>
                <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
                <div className="h-4 bg-gray-200 rounded w-1/2 mb-4"></div>
                <div className="h-8 bg-gray-200 rounded w-full"></div>
              </div>
            ))}
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            {newArrivals.map((product) => (
              <div key={product.id} className="bg-white rounded-lg shadow-sm overflow-hidden">
                <Link to={`/product/${product.id}`} className="block relative">
                  <img
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    className="w-full h-48 object-cover"
                  />
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    НОВИНКА
                  </span>
                </Link>
                <div className="p-4">
                  <Link to={`/product/${product.id}`}>
                    <h3 className="font-medium text-gray-900 mb-2 line-clamp-2">{product.name}</h3>
                    <p className="text-xl font-bold">{product.price} ₴</p>
                  </Link>
                  <button
                    onClick={() => handleAddToCart(product)}
                    className="mt-4 w-full bg-blue-600 text-white py-2 rounded flex items-center justify-center hover:bg-blue-700 transition-colors"
                  >
                    <ShoppingCart size={18} className="mr-2" />В кошик
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* Переваги */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-10">
          <h2 className="text-3xl font-bold text-gray-900">Чому обирають нас</h2>
          <p className="mt-2 text-lg text-gray-600">Переваги покупок у нашому магазині</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="text-center">
            <div className="bg-blue-100 text-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <TrendingUp size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Якісні товари</h3>
            <p className="text-gray-600">Ми пропонуємо тільки перевірені товари від надійних виробників</p>
          </div>
          <div className="text-center">
            <div className="bg-green-100 text-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Award size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Гарантія</h3>
            <p className="text-gray-600">На всі товари діє гарантія від виробника</p>
          </div>
          <div className="text-center">
            <div className="bg-purple-100 text-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Clock size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Швидка доставка</h3>
            <p className="text-gray-600">Доставляємо замовлення протягом 1-3 робочих днів</p>
          </div>
          <div className="text-center">
            <div className="bg-red-100 text-red-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users size={32} />
            </div>
            <h3 className="text-xl font-bold mb-2">Підтримка</h3>
            <p className="text-gray-600">Наші консультанти завжди готові допомогти з вибором</p>
          </div>
        </div>
      </section>

      {/* Відгуки */}
      <section className="py-12 bg-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-10">
            <h2 className="text-3xl font-bold text-gray-900">Відгуки наших клієнтів</h2>
            <p className="mt-2 text-lg text-gray-600">Що про нас говорять</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "Дуже задоволений якістю товарів. Замовляв бігові кросівки, доставили швидко, все відповідає опису.
                Рекомендую!"
              </p>
              <div className="flex items-center">
                
                <div>
                  <p className="font-medium">Олександр К.</p>
                  <p className="text-sm text-gray-500">Київ</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "Чудовий магазин! Великий вибір спортивного одягу. Особливо сподобалась швидка доставка та якісна
                упаковка."
              </p>
              <div className="flex items-center">
                
                <div>
                  <p className="font-medium">Марія Л.</p>
                  <p className="text-sm text-gray-500">Львів</p>
                </div>
              </div>
            </div>
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <div className="flex text-yellow-400 mb-4">
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
                <Star size={20} className="fill-current" />
              </div>
              <p className="text-gray-600 mb-4">
                "Замовляв спортивний інвентар для домашніх тренувань. Консультант допоміг з вибором, все прийшло вчасно.
                Дуже задоволений!"
              </p>
              <div className="flex items-center">
                <img src="/placeholder.svg?height=40&width=40" alt="Аватар" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <p className="font-medium">Ігор В.</p>
                  <p className="text-sm text-gray-500">Одеса</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Підписка на розсилку */}
      <section className="py-16 bg-gradient-to-r from-blue-500 to-purple-600 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Підпишіться на наші новини</h2>
          <p className="text-lg mb-8 max-w-2xl mx-auto">
            Отримуйте інформацію про нові надходження, акції та знижки першими
          </p>
          <form className="max-w-md mx-auto flex">
            <input
              type="email"
              placeholder="Ваш email"
              className="flex-1 py-3 px-4 rounded-l-lg text-gray-900"
              required
            />
            <button
              type="submit"
              className="bg-blue-800 hover:bg-blue-900 py-3 px-6 rounded-r-lg font-medium transition-colors"
            >
              Підписатися
            </button>
          </form>
        </div>
      </section>

      {/* Футер */}
      <footer className="bg-gray-900 text-white pt-12 pb-6">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="text-xl font-bold mb-4">SPORTSPIDER</h3>
              <p className="text-gray-400 mb-4">Ваш надійний партнер у світі спорту та активного відпочинку</p>
              <div className="flex space-x-4">
                <a href="https://facebook.com" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="https://instagram.com" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="https://twitter.com" className="text-gray-400 hover:text-white">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.713v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" />
                  </svg>
                </a>
              </div>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Інформація</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/about" className="text-gray-400 hover:text-white">
                    Про нас
                  </a>
                </li>
                <li>
                  <a href="/delivery" className="text-gray-400 hover:text-white">
                    Доставка і оплата
                  </a>
                </li>
                <li>
                  <a href="/returns" className="text-gray-400 hover:text-white">
                    Повернення товару
                  </a>
                </li>
                <li>
                  <a href="/privacy" className="text-gray-400 hover:text-white">
                    Політика конфіденційності
                  </a>
                </li>
                <li>
                  <a href="/terms" className="text-gray-400 hover:text-white">
                    Умови використання
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Категорії</h3>
              <ul className="space-y-2">
                <li>
                  <a href="/category/1" className="text-gray-400 hover:text-white">
                    Взуття
                  </a>
                </li>
                <li>
                  <a href="/category/2" className="text-gray-400 hover:text-white">
                    Одяг
                  </a>
                </li>
                <li>
                  <a href="/category/3" className="text-gray-400 hover:text-white">
                    Аксесуари
                  </a>
                </li>
                <li>
                  <a href="/category/4" className="text-gray-400 hover:text-white">
                    Обладнання
                  </a>
                </li>
                <li>
                  <a href="/category/5" className="text-gray-400 hover:text-white">
                    Харчування
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">Контакти</h3>
              <ul className="space-y-2 text-gray-400">
                <li>м. Миколаїв. Спортивна, 42</li>
                <li>Телефон: +380 00 133 45 67</li>
                <li>Email: info@sportspider.ua</li>
                <li>Пн-Пт: 9:00 - 20:00</li>
                <li>Сб-Нд: 10:00 - 18:00</li>
              </ul>
            </div>
          </div>
          <div className="pt-8 mt-8 border-t border-gray-800 text-center text-gray-400 text-sm">
            <p>&copy; {new Date().getFullYear()} SPORTSPIDER. Всі права захищені.</p>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home

