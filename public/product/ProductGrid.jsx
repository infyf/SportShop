import { Heart } from "lucide-react"

const products = [
  {
    id: 1,
    name: "Футбольний м'яч Nike Strike",
    price: 999,
    image: "",
    category: "football-balls",
  },
  {
    id: 2,
    name: "Бігові кросівки Adidas Ultraboost",
    price: 4999,
    image: "",
    category: "running-shoes",
  },
]

function ProductGrid({ categoryId, searchQuery }) {
  const filteredProducts = products.filter((product) => {
    if (categoryId && !product.category.includes(categoryId)) return false
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false
    return true
  })

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id}>
            <div>
              <img
                src={product.image || "/placeholder.svg"}
                alt={product.name}
              />
              <button>
                <Heart size={20} />
              </button>
            </div>
            <h3>{product.name}</h3>
            <p>{product.price} ₴</p>
            <button>В кошик</button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ProductGrid
