import { createBrowserRouter, Navigate } from "react-router-dom";
import { lazy, Suspense } from "react";
import { useAppSelector } from "../store/hooks";
import { UserRole } from "../enums/user.enum";

// Lazy loaded pages
const RegisterPage = lazy(() => import("../pages/RegisterPage"));
const LoginPage = lazy(() => import("../pages/LoginPage"));
const CourseCatalogPage = lazy(() => import("../pages/CourseCatalogPage"));
const CourseDetailPage = lazy(() => import("../pages/CourseDetailPage"));
const LearnerDashboardPage = lazy(
  () => import("../pages/LearnerDashboardPage"),
);
const MentorDashboardPage = lazy(() => import("../pages/MentorDashboardPage"));
const UploadCoursePage = lazy(() => import("../pages/UploadCoursePage"));

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
  {
    path: "/",
    element: (
      <Suspense fallback={null}>
        <CourseCatalogPage />
      </Suspense>
    ),
  },
  {
    path: "/register",
    element: (
      <Suspense fallback={null}>
        <RegisterPage />
      </Suspense>
    ),
  },
  {
    path: "/login",
    element: (
      <Suspense fallback={null}>
        <LoginPage />
      </Suspense>
    ),
  },
  // ⚠️ Static route BEFORE dynamic — fixes your /courses/upload conflict
  {
    path: "/courses/upload",
    element: (
      <ProtectedRoute role={UserRole.MENTOR}>
        <Suspense fallback={null}>
          <UploadCoursePage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/courses/:id",
    element: (
      <Suspense fallback={null}>
        <CourseDetailPage />
      </Suspense>
    ),
  },
  {
    path: "/dashboard/mentor",
    element: (
      <ProtectedRoute role={UserRole.MENTOR}>
        {" "}
        {/* Fixed: was raw string "mentor" */}
        <Suspense fallback={null}>
          <MentorDashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard/learner",
    element: (
      <ProtectedRoute role={UserRole.LEARNER}>
        <Suspense fallback={null}>
          <LearnerDashboardPage />
        </Suspense>
      </ProtectedRoute>
    ),
  },
]);
