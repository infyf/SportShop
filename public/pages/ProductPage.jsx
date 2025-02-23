

import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router-dom"
import { ShoppingCart, Plus, Minus, Heart, ArrowLeft } from "lucide-react"

const ProductPage = () => {
  const { productId } = useParams()
  const navigate = useNavigate()
  const [product, setProduct] = useState(null)
  const [quantity, setQuantity] = useState(1)

  useEffect(() => {
    fetch("/data/products.json")
      .then((res) => res.json())
      .then((data) => {
        const foundProduct = data.products.find((p) => p.id === Number.parseInt(productId))
        if (foundProduct) {
          setProduct(foundProduct)
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

  if (!product) {
    return (
      <div>
        <div>
          <h2>Товар не знайдено</h2>
          <p>Вибачте, але товар з таким ID не існує.</p>
          <button onClick={() => navigate("/catalog")}>
            <ArrowLeft />
            Повернутися до каталогу
          </button>
        </div>
      </div>
    )
  }

  return (
    <div>
      <button onClick={() => navigate(-1)}>
        <ArrowLeft />
        Назад
      </button>

      <div>
        <div>
          <div>
            <img src={product.image || "/placeholder.svg"} alt={product.name} />
            <button>
              <Heart />
            </button>
          </div>
        </div>

        <div>
          <div>
            <h1>{product.name}</h1>
            <p>{product.price} ₴</p>

            <div>
              <h3>Характеристики:</h3>
              <div>
                {Object.entries(product.specifications).map(([key, value]) => (
                  <div key={key}>
                    <span>{key}:</span>
                    <span>{value}</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p>{product.description}</p>
            </div>

            <div>
              <div>
                <button onClick={() => handleQuantityChange(-1)}>
                  <Minus />
                </button>
                <span>{quantity}</span>
                <button onClick={() => handleQuantityChange(1)}>
                  <Plus />
                </button>
              </div>
              <span>В наявності: {product.inStock} шт.</span>
            </div>

            <button onClick={handleAddToCart}>
              <ShoppingCart />
              Додати в кошик
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductPage
