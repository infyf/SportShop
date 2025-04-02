"use client"

import { useEffect } from "react"
import { Link } from "react-router-dom"
import { ArrowRight } from "lucide-react"
import Slider from "../Slider/Slider"
import VideoBoard from "../components/VideoBoard/VideoBoard"

function Home() {
  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {

      })
      .catch((error) => {
        console.error("Error loading products:", error)
      })
  }, [])

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
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 100 10.27 5.135 5.135 0 000-10.27zm0 8.265a3.13 3.13 0 110-6.26 3.13 3.13 0 010 6.26z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </main>
  )
}

export default Home
