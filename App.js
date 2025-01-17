import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbard/Navbar";
import AuthForm from "./components/Auth/AuthForm";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/auth" element={<AuthForm />} />
      </Routes>
    </Router>
  );
}

export default App;