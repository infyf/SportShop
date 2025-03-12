
import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { Star, ShoppingCart, Plus, Minus, Heart, ArrowLeft } from "lucide-react"
import { useWishlist } from "../components/context/WishlistContext"

const ProductPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [reviews, setReviews] = useState([])
  const [newReview, setNewReview] = useState({
    rating: 0,
    comment: "",
    author: "",
  })

  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist()
  const productInWishlist = product ? isInWishlist(Number(productId)) : false

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.products.find((p) => p.id === Number.parseInt(productId))
        if (foundProduct) {
          setProduct(foundProduct)

          fetch("/data/reviews.json")
            .then((res) => res.json())
            .then((reviewsData) => {
              const productReviews = reviewsData.reviews[productId] || []
              setReviews(productReviews)
            })
            .catch((error) => console.error("Error loading reviews:", error))
        }
      })
      .catch((error) => console.error("Error loading product:", error))
  }, [productId])

  const handleQuantityChange = (change) => {
    setQuantity((prev) => Math.max(1, Math.min(prev + change, product?.inStock || 1)))
  }

  const handleAddToCart = () => {
    console.log(`Adding ${quantity} of ${product.name} to cart`)
  }

  const handleToggleWishlist = () => {
    if (productInWishlist) {
      removeFromWishlist(Number(productId))
    } else {
      addToWishlist({
        id: product.id,
        name: product.name,
        price: product.price,
        image: product.image,
      })
    }
  }

  const handleReviewSubmit = (e) => {
    e.preventDefault()
    const review = {
      id: reviews.length + 1,
      ...newReview,
      date: new Date().toISOString().split("T")[0],
    }

    // update review
    setReviews([review, ...reviews])

    setNewReview({ rating: 0, comment: "", author: "" })
  }

  if (!product) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="text-center p-8">
          <h2 className="text-2xl font-bold text-gray-900">Товар не знайдено</h2>
          <p className="mt-2 text-gray-600">Вибачте, але товар з таким ID не існує.</p>
          <button
            onClick={() => navigate("/catalog")}
            className="mt-4 inline-flex items-center text-blue-600 hover:text-blue-700"
          >
            <ArrowLeft className="mr-2" size={20} />
            Повернутися до каталогу
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={() => navigate(-1)} className="flex items-center text-gray-600 hover:text-gray-900 mb-6">
        <ArrowLeft className="mr-2" size={20} />
        Назад
      </button>

      <div className="grid md:grid-cols-2 gap-8">
        <div className="space-y-4">
          <div className="relative">
            <img src={product.image || "/placeholder.svg"} alt={product.name} className="w-full rounded-lg shadow-lg" />
            <button
              onClick={handleToggleWishlist}
              className="absolute top-4 right-4 p-2 bg-white rounded-full shadow hover:bg-gray-100 transition-all duration-300"
            >
              <Heart size={24} className={productInWishlist ? "text-red-500 fill-red-500" : "text-gray-600"} />
            </button>
          </div>
        </div>

        <div>
          <div className="sticky top-4">
            <h1 className="text-3xl font-bold mb-4">{product.name}</h1>
            <div className="flex items-center gap-4 mb-4">
              <p className="text-2xl font-semibold">{product.price} ₴</p>
              {product.discount && (
                <span className="bg-red-500 text-white text-sm px-2 py-1 rounded">-{product.discount}%</span>
              )}
              {product.isNew && <span className="bg-green-500 text-white text-sm px-2 py-1 rounded">НОВИНКА</span>}
            </div>

            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <h3 className="font-semibold mb-2">Характеристики:</h3>
              <ul className="space-y-2">
                {Object.entries(product.specifications).map(([key, value]) => (
                  <li key={key} className="flex justify-between">
                    <span className="text-gray-600">{key}:</span>
                    <span className="font-medium">{value}</span>
                  </li>
                ))}
              </ul>
            </div>

            <p className="text-gray-600 mb-6 whitespace-pre-line">{product.description}</p>

            <div className="flex items-center mb-6">
              <button
                onClick={() => handleQuantityChange(-1)}
                className="bg-gray-100 p-2 rounded-l hover:bg-gray-200 transition-colors"
              >
                <Minus size={20} />
              </button>
              <span className="bg-gray-50 px-6 py-2">{quantity}</span>
              <button
                onClick={() => handleQuantityChange(1)}
                className="bg-gray-100 p-2 rounded-r hover:bg-gray-200 transition-colors"
              >
                <Plus size={20} />
              </button>
              <span className="ml-4 text-gray-500">В наявності: {product.inStock} шт.</span>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handleAddToCart}
                className="flex-1 bg-blue-600 text-white py-3 rounded-lg flex items-center justify-center hover:bg-blue-700 transition-colors"
              >
                <ShoppingCart className="mr-2" />
                Додати в кошик
              </button>

              <button
                onClick={handleToggleWishlist}
                className={`px-4 py-3 rounded-lg flex items-center justify-center transition-colors ${
                  productInWishlist
                    ? "bg-red-100 text-red-600 hover:bg-red-200"
                    : "bg-gray-100 text-gray-600 hover:bg-gray-200"
                }`}
              >
                <Heart className={productInWishlist ? "fill-red-500" : ""} />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-6">Відгуки</h2>

        <form onSubmit={handleReviewSubmit} className="mb-8 bg-gray-50 p-6 rounded-lg">
          <div className="mb-4">
            <label htmlFor="author" className="block text-sm font-medium mb-1">
              Ваше ім'я
            </label>
            <input
              type="text"
              id="author"
              value={newReview.author}
              onChange={(e) => setNewReview((prev) => ({ ...prev, author: e.target.value }))}
              className="w-full p-2 border rounded"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-1">Оцінка</label>
            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  size={24}
                  className={`cursor-pointer ${
                    star <= newReview.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                  }`}
                  onClick={() => setNewReview((prev) => ({ ...prev, rating: star }))}
                />
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label htmlFor="comment" className="block text-sm font-medium mb-1">
              Ваш відгук
            </label>
            <textarea
              id="comment"
              value={newReview.comment}
              onChange={(e) => setNewReview((prev) => ({ ...prev, comment: e.target.value }))}
              className="w-full p-2 border rounded"
              rows={4}
              required
            />
          </div>

          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition-colors"
          >
            Додати відгук
          </button>
        </form>

        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow">
              <div className="flex items-center justify-between mb-2">
                <span className="font-medium">{review.author}</span>
                <span className="text-gray-500 text-sm">{review.date}</span>
              </div>
              <div className="flex mb-2">
                {[1, 2, 3, 4, 5].map((star) => (
                  <Star
                    key={star}
                    size={16}
                    className={`${star <= review.rating ? "text-yellow-400 fill-current" : "text-gray-300"}`}
                  />
                ))}
              </div>
              <p className="text-gray-600">{review.comment}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default ProductPage

