import logo from './logo.svg';
import './App.css';
import HomePage from './component/HomePage';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LoginPage from './component/Login_page';
import Register from './component/register';
function App() {
  return (
    <div>
      {/* <HomePage /> */}
         <Router>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<LoginPage />} />



        </Routes>
    </Router>

    </div>
  );
}

export default App;
