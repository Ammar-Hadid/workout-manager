import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { AuthProvider, useAuth } from "../context/AuthContext.jsx"
import { ToastProvider } from "../context/toastContext.jsx";
import { ConfirmProvider } from "../context/confirmContext.jsx";


import AuthPage from "../pages/AuthPage.jsx"

import MainLayout from "../components/layout/MainLayout.jsx";
import DevelopmentPreviewBanner from "../components/layout/DevelopmentPreviewBanner.jsx";
import Dashboard from "../pages/Dashboard.jsx";

import ProgramsPage from "../pages/ProgramsPage.jsx";
import WorkoutsPage from "../pages/WorkoutsPage.jsx";
import ExercisePage from "../pages/ExercisePage.jsx";


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
            <DevelopmentPreviewBanner />

            <Routes>
              <Route element={<ProtectedRoute><MainLayout /></ProtectedRoute>}>
                <Route path="/" element={<Dashboard />} />
                <Route path="/programs" element={<ProgramsPage />} />
                <Route path="/programs/:programId/workouts" element={< WorkoutsPage />} />
                <Route path="/programs/:programId/workouts/:workoutId/exercises" element={<ExercisePage />} />
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

