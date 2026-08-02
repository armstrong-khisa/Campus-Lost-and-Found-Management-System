import { useState } from "react";
import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import About from "./pages/About";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import AuthModal from "./components/AuthModal";
import ReportItemModal from "./components/ReportItemModal";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  const [showAuth, setShowAuth] = useState(false);
  const [showReport, setShowReport] = useState(false);

  return (
    <>
      <Navbar
        onLoginClick={() => setShowAuth(true)}
        onReportClick={() => setShowReport(true)}
      />

      <Routes>
        <Route path="/" element={<Home />} />

        <Route path="/about" element={<About />} />

        <Route path="/items" element={<Items />} />

        <Route path="/items/:id" element={<ItemDetails />} />

        {/* Protected User Dashboard */}
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* Protected Admin Dashboard (temporary) */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />} />
      </Routes>

      <AuthModal
        isOpen={showAuth}
        onClose={() => setShowAuth(false)}
      />

      <ReportItemModal
        isOpen={showReport}
        onClose={() => setShowReport(false)}
      />

      <Footer />
    </>
  );
}

export default App;