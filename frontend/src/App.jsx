import { Routes, Route } from 'react-router-dom'
import { Home } from './pages/Home'
import { SellerLogin, BuyerLogin, SellerRegister, BuyerRegister } from './pages/AuthPages'
import { SellerDashboard, BuyerDashboard } from './pages/Dashboard'
import { AddResource, EditResource } from './pages/ResourceForm'
import { ResourceDetail } from './pages/ResourceDetail'
import { ProtectedRoute } from './components/ProtectedRoute'
import './App.css'

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login-seller" element={<SellerLogin />} />
      <Route path="/login-buyer" element={<BuyerLogin />} />
      <Route path="/register-seller" element={<SellerRegister />} />
      <Route path="/register-buyer" element={<BuyerRegister />} />
      
      <Route 
        path="/seller-dashboard" 
        element={
          <ProtectedRoute requiredRole="seller">
            <SellerDashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/buyer-dashboard" 
        element={
          <ProtectedRoute requiredRole="buyer">
            <BuyerDashboard />
          </ProtectedRoute>
        } 
      />
      
      <Route 
        path="/add-resource" 
        element={
          <ProtectedRoute requiredRole="seller">
            <AddResource />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/edit-resource/:id" 
        element={
          <ProtectedRoute requiredRole="seller">
            <EditResource />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/resource/:id" 
        element={
          <ProtectedRoute requiredRole="buyer">
            <ResourceDetail />
          </ProtectedRoute>
        } 
      />
    </Routes>
  )
}

export default App
