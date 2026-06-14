import { BrowserRouter, Routes, Route } from "react-router-dom";

import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import RegisterSeller from "./pages/RegisterSeller";
import RegisterBuyer from "./pages/RegisterBuyer";
import SellerDashboard from "./pages/SellerDashboard";
import BuyerDashboard from "./pages/BuyerDashboard";
import AddResource from "./pages/AddResource";
import EditResource from "./pages/EditResource";
import SellerRequests from "./pages/SellerRequests";

function App() {
  return (
    <BrowserRouter>
      <Routes>

        {/* Home Page */}
        <Route
          path="/"
          element={<HomePage />}
        />

        {/* Login Pages */}
        <Route
          path="/seller-login"
          element={<Login role="Seller" />}
        />

        <Route
          path="/buyer-login"
          element={<Login role="Buyer" />}
        />

        {/* Registration Pages */}
        <Route
          path="/register-seller"
          element={<RegisterSeller />}
        />

        <Route
          path="/register-buyer"
          element={<RegisterBuyer />}
        />

        {/* Dashboards */}
        <Route
          path="/seller-dashboard"
          element={<SellerDashboard />}
        />

        <Route
          path="/buyer-dashboard"
          element={<BuyerDashboard />}
        />

        {/* Resource Management */}
        <Route
          path="/add-resource"
          element={<AddResource />}
        />

        <Route
          path="/edit-resource/:id"
          element={<EditResource />}
        />
<Route
  path="/seller-requests"
  element={<SellerRequests />}
/>
      </Routes>
    </BrowserRouter>
  );
}

export default App;