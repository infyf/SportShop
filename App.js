import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbard/Navbar";
import AuthForm from "./components/Auth/AuthForm";
import Slider from "./components/home/Slider";
import Categories from './components/home/Category';


function App() {
  return (
    <Router>
      <Navbar />
      <Slider />
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
        <Route path="/category" element={<Categories />} />
      </Routes>
    </Router>
  );
}

export default App;
