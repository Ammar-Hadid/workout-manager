import { createBrowserRouter, RouterProvider, Navigate, redirect } from "react-router-dom";

import { AuthProvider, useAuth } from "../features/auth/context/AuthContext.jsx"
import { ToastProvider } from "../shared/context/toastContext.jsx";
import { ConfirmProvider } from "../shared/context/confirmContext.jsx";


import AuthPage from "../features/auth/pages/AuthPage.jsx"

import MainLayout from "../shared/layout/MainLayout.jsx";
import DevelopmentPreviewBanner from "../shared/layout/DevelopmentPreviewBanner.jsx";
import Dashboard from "../features/dashboard/pages/Dashboard.page.jsx";

import ProgramsPage from "../features/programs/pages/ProgramsPage.jsx";
import WorkoutsPage from "../features/workouts/pages/WorkoutsPage.jsx";
import ExercisePage from "../features/exercises/pages/ExercisePage.jsx";

import { requireUser } from "../features/auth/loaders/requireUser.loader.js";
import { redirectIfAuthenticated } from "../features/auth/loaders/redirectIfAuthenticated.loader.js";

const router = createBrowserRouter([

  {
    element: <MainLayout />,
    loader: requireUser,

    children: [
      {
        path: '/',
        element: <Dashboard />,
      },

      {
        path: '/programs',
        element: <ProgramsPage />,
      },

      {
        path: '/programs/:programId/workouts',
        element: <WorkoutsPage />,
      },

      {
        path: '/programs/:programId/workouts/:workoutId/exercises',
        element: <ExercisePage />
      },
    ]
  },

  {
    path: '/login',
    element: <AuthPage />,
    loader: redirectIfAuthenticated,
  },

])


function App() {

  return (
    <AuthProvider>
      <ToastProvider>
        <ConfirmProvider>
          <RouterProvider router={router} />
        </ConfirmProvider>
      </ToastProvider>
    </AuthProvider>
  )


}

export default App
