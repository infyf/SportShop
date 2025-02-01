import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Navbar from "./components/navbard/Navbar"
import Home from "./pages/Home"
import Catalog from "./pages/Catalog"
import AddProducts from "./pages/AddProducts"

function App() {
  return (
    <Router>
      <div className="min-h-screen">
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/catalog" element={<Catalog />} />
          <Route path="/add-products" element={<AddProducts />} />
          <Route path="/category/:categoryId" element={<Catalog />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App

