import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";


import { AuthProvider, useAuth } from "../features/auth/context/AuthContext.jsx"
import { ToastProvider } from "../shared/context/toastContext.jsx";
import { ConfirmProvider } from "../shared/context/confirmContext.jsx";


import AuthPage from "../features/auth/pages/AuthPage.jsx"

import MainLayout from "../shared/layout/MainLayout.jsx";
import DevelopmentPreviewBanner from "../shared/layout/DevelopmentPreviewBanner.jsx";
import Dashboard from "../features/dashboard/pages/Dashboard.jsx";

import ProgramsPage from "../features/programs/pages/ProgramsPage.jsx";
import WorkoutsPage from "../features/workouts/pages/WorkoutsPage.jsx";
import ExercisePage from "../features/exercises/pages/ExercisePage.jsx";


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
