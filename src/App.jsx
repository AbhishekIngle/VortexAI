import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from './components/Login';         // Adjust path if needed
import Dashboard from './components/Dashboard'; // Adjust path if needed
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </Router>
      <ToastContainer position="top-center" />
    </>
  );
}

export default App;
