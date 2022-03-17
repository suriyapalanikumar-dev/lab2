import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login';
import CheckName from './components/SellItems/CheckName';
import ShopDetails from './components/SellItems/ShopDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";

function App() {
  return (
    <Router>
    <Routes>
    <Route exact path="/" element={<Navbar/>} />
    <Route path="/sell" element={<CheckName/>} />
    <Route path="/shopdetails" element={<ShopDetails/>} />
    </Routes>
  </Router>
  );
}

export default App;
