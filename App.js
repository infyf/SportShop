import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbard/Navbar"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import AddProducts from "./pages/AddProducts"
import ProductPage from "./pages/ProductPage"
import WishlistPage from "./pages/WishlistPage"
import CartPage from "./pages/CartPage"
import { WishlistProvider } from "./components/context/WishlistContext"
import { CartProvider } from "./components/context/CartContext"

function App() {
  return (
    <WishlistProvider>
      <CartProvider>
        <Router>
          <div className="min-h-screen bg-gray-50">
            <Navbar />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/catalog" element={<Catalog />} />
              <Route path="/add-products" element={<AddProducts />} />
              <Route path="/category/:categoryId" element={<Catalog />} />
              <Route path="/product/:productId" element={<ProductPage />} />
              <Route path="/wishlist" element={<WishlistPage />} />
              <Route path="/cart" element={<CartPage />} />
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </WishlistProvider>
  )
}

export default App

