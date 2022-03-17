import logo from './logo.svg';
import './App.css';
import Navbar from './components/Navbar/Navbar.jsx';
import Login from './components/Login/Login';
import SellItems from './components/SellItems/SellItems';

function App() {
  return (
    <div className="App">
      <Navbar/>
      <SellItems/>
    </div>
  );
}

export default App;
