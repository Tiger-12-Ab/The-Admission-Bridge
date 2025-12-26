import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import UniversityDetails from "./pages/UniversityDetails";
import University from "./pages/University";
import About from "./pages/About";
import Compare from "./pages/Compare";
import { CompareProvider } from "./context/CompareContext";


  

function App() {
  return (
    <BrowserRouter>
    <CompareProvider>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/university" element={<University />} />
        <Route path="/universities/:id" element={<UniversityDetails />} />
        <Route path="/about" element={<About />} />
        <Route path="/compare" element={<Compare />} />
      </Routes>
      <Footer />
      </CompareProvider>
    </BrowserRouter>
  );
}

export default App;

    
