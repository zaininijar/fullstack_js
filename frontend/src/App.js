import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import "./index.css";
import ProductList from "./components/ProductList";
import AddProduct from "./components/AddProduct";
import EditeProduct from "./components/EditeProduct";
import Login from "./pages/auth/Login";
import Register from "./pages/auth/Register";
import Dashboard from "./components/Dashboard";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/products" element={<ProductList />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/edite/:id" element={<EditeProduct />} />
        <Route exact path="/" element={<Login />} />
        <Route exact path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={[<Navbar />, <Dashboard />]} />
      </Routes>
    </Router>
  );
}

export default App;
