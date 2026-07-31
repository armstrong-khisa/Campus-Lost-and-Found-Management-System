import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Items from "./pages/Items";
import ItemDetails from "./pages/ItemDetails";
import Dashboard from "./pages/Dashboard";
import AdminDashboard from "./pages/AdminDashboard";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />

      <Route path="/items" element={<Items />} />

      <Route path="/items/:id" element={<ItemDetails />} />

      <Route path="/dashboard" element={<Dashboard />} />

      <Route path="/admin" element={<AdminDashboard />} />

      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;