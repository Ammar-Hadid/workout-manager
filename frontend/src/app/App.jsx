import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { AuthProvider, useAuth } from "../context/AuthContext.jsx"
import { ToastProvider } from "../context/toastContext.jsx";
import { ConfirmProvider } from "../context/confirmContext.jsx";


import AuthPage from "../pages/AuthPage.jsx"

import MainLayout from "../components/layout/MainLayout.jsx";
import Dashboard from "../pages/Dashboard.jsx";
import ProgramsPage from "../pages/ProgramsPage.jsx";


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
        <ConfirmProvider>
          <BrowserRouter>
            <Routes>
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/programs" element={<ProgramsPage />} />
              </Route>

              <Route path="/login" element={<AuthPage />} />
            </Routes>
          </BrowserRouter>
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  )


}

export default App
