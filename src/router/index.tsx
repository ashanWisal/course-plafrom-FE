import { createBrowserRouter, Navigate } from "react-router-dom";
import { useAppSelector } from "../store/hooks";
import RegisterPage from "../pages/RegisterPage";
import { UserRole } from "../enums/user.enum";
import LoginPage from "../pages/LoginPage";
import CourseCatalogPage from "../pages/CourseCatalogPage";
import CourseDetailPage from "../pages/CourseDetailPage";
import LearnerDashboardPage from "../pages/LearnerDashboardPage";
import MentorDashboardPage from "../pages/MentorDashboardPage";
import UploadCoursePage from "../pages/UploadCoursePage";

const ProtectedRoute = ({
  children,
  role,
}: {
  children: React.ReactNode;
  role?: UserRole;
}) => {
  const { isAuthenticated, user } = useAppSelector((s) => s.auth);
  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (role && user?.role !== role) return <Navigate to="/" replace />;
  return <>{children}</>;
};

export const router = createBrowserRouter([
    { path: '/', element: <CourseCatalogPage /> },
  { path: "/register", element: <RegisterPage /> },
  { path: "/login", element: <LoginPage /> },
    { path: '/courses/:id', element: <CourseDetailPage /> },
    {
      path: '/dashboard/mentor',
      element: (
        <ProtectedRoute role="mentor">
          <MentorDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/dashboard/learner',
      element: (
        <ProtectedRoute role={UserRole.LEARNER}>
          <LearnerDashboardPage />
        </ProtectedRoute>
      ),
    },
    {
      path: '/courses/upload',
      element: (
        <ProtectedRoute role={UserRole.MENTOR}>
          <UploadCoursePage />
        </ProtectedRoute>
      ),
    },
]);
