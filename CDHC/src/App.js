import { Route, Router, Routes } from 'react-router-dom';
import './App.css';
import AuthPage from './Pages/AuthPage/AuthPage';
import HomePage from './Pages/HomePage/HomePage';

function App() {
  return (
    <>
      <div>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/homepage" element={<HomePage />} />
        </Routes>
      </div>
    </>
  );
}

export default App;
