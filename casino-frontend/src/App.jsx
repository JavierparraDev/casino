import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import DashboardPage from './pages/DashboardPage';
import BetPage from './pages/BetPage';
import AccountPage from './pages/AccountPage';
import RegisterPage from './pages/Register';
import BetsHistory from './pages/BetsHistory';
import AdminBalance from './pages/AdminBalance';
import RecargaPage from './pages/RecargaPage';
import RetiroPage from './pages/RetiroPage';
import Layout from './components/Layout';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route element={<Layout />}>

        <Route path="/" element={<DashboardPage />} />
        <Route path="/bet" element={<BetPage />} />
        <Route path="/register" element={<RegisterPage />} />
        <Route path="/account" element={<AccountPage />} />
        <Route path="/betsHistory" element={<BetsHistory />} />
        <Route path="/adminBalance" element={<AdminBalance />} />
        <Route path="/recargaPage" element={<RecargaPage />} />
        <Route path="/retiroPage" element={<RetiroPage />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;