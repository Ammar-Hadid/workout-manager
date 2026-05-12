import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { AuthProvider, useAuth } from "./context/AuthContext.jsx"
import { ToastProvider, useToast } from "./context/toastContext.jsx";

import AuthPage from "./Pages/AuthPage.jsx"
import Dashboard from "./Pages/Dashboard.jsx";

import MainLayout from "./Components/MainLayout.jsx";

const ProtectedRoute = ({ children }) => {
  const { user, isAuthLoading } = useAuth();

  if (isAuthLoading) {
    return <p>Loading...</p>
  }

  if (!user) {
    return <Navigate to="/login" replace />
  }

  return children
}

function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
              <Route path="/" element={<Dashboard />} />
            </Route>

            <Route path="/login" element={<AuthPage />} />
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )


}

export default App
