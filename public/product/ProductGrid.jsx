import React from 'react';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ProductGrid = ({ categoryId, searchQuery }) => {
  const navigate = useNavigate();
  const [products, setProducts] = React.useState([]);

  React.useEffect(() => {
 
    fetch('/data/products.json')
      .then(res => res.json())
      .then(data => setProducts(data.products))
      .catch(error => console.error('Error loading products:', error));
  }, []);

  const filteredProducts = products.filter((product) => {
    if (categoryId && !product.category.includes(categoryId)) return false;
    if (searchQuery && !product.name.toLowerCase().includes(searchQuery.toLowerCase())) return false;
    return true;
  });

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  return (
    <div className="flex-1">
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {filteredProducts.map((product) => (
          <div key={product.id} className="bg-white rounded-lg shadow-md p-4 hover:shadow-lg transition-shadow">
            <div 
              onClick={() => handleProductClick(product.id)}
              className="cursor-pointer"
            >
              <div className="relative">
                <img
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  className="w-full aspect-square object-cover rounded-md"
                />
                <button 
                  className="absolute top-2 right-2 p-2 bg-white rounded-full shadow hover:bg-gray-100"
                  onClick={(e) => {
                    e.stopPropagation();
                    // wishlist 
                  }}
                >
                  <Heart size={20} className="text-gray-600" />
                </button>
                {product.isNew && (
                  <span className="absolute top-2 left-2 bg-green-500 text-white text-xs px-2 py-1 rounded">
                    НОВИНКА
                  </span>
                )}
                {product.discount && (
                  <span className="absolute top-2 right-12 bg-red-500 text-white text-xs px-2 py-1 rounded">
                    -{product.discount}%
                  </span>
                )}
              </div>
              <h3 className="mt-4 text-gray-800 font-medium">{product.name}</h3>
              <p className="mt-2 text-xl font-bold">{product.price} ₴</p>
            </div>
            <button 
              className="mt-4 w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700 transition-colors"
              onClick={(e) => {
                e.stopPropagation();
                // cart 
              }}
            >
              В кошик
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductGrid;
