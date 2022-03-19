import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar.js';
import Login from './components/Login/Login';
import CheckName from './components/SellItems/CheckName';
//import ShopDetails from './components/SellItems/ShopDetails';
import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
import ShopDisplay from './components/SellItems/ShopDisplay.js';
import Dashboard from './components/Dashboard/Dashboard';

function App() {
  return (
    <div className="App">
    <Router>
    <Routes>
    <Route exact path="/" element={<Navbar/>} />
    <Route path="/sell" element={<CheckName/>} />
    <Route path="/shopdetails" element={<ShopDisplay/>} />
    <Route path="/dashboard" element ={<Dashboard/>}/>
    </Routes>
    </Router>
    </div>

  );
}

export default App;
