import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import GuestRoute from "./GuestRoute";
import NavbarComponent from "../components/navigation/NavbarComponentOriginal";
import DocumentVerification from "../components/DocumentVerification";
import FooterComponent from "../components/footer/FooterComponent";
import AdmissionPage from "../pages/Admission/admissionPage";
import StudentApplicationPage from "../pages/application/StudentApplicationPage";
import AboutUsPage from "../pages/info/AboutUsPage";
import NotFoundPage from "../pages/info/NotFoundPage";
import ScrollToTop from "../utils/ScrollToTop";
import EduconChatbot from "../components/EduconChatbot";
import { useAuth } from "../contexts/authContext";
import CourseApplicationPage from "../pages/application/CourseApplicationPage";
import ScholarshipApplicationPage from "../pages/application/ScholarshipApplicationPage";
import { Toaster } from "react-hot-toast";

// Lazy imports
import UniversityApplicationView from "../pages/application/UniversityApplicationView";
import UniversityApplicationPage from "../pages/application/UniversityApplicationPage";
import ScholarshipPage from "../pages/Admission/ScholarshipPage";

const LandingPage = lazy(() => import("../pages/dashboard/LandingPage"));
const UniversityDashboardPage = lazy(() =>
  import("../pages/dashboard/UniversityDashboardPage")
);
const UserProfile = lazy(() => import("../pages/profile/UserProfilePage"));
const CoursesPage = lazy(() => import("../pages/course/CoursesPage"));
const AuthPage = lazy(() => import("../pages/authentication/AuthPage"));
const SubscriptionPage = lazy(() =>
  import("../pages/subscriptions/subscriptions")
);

function LayoutWrapper() {
  const location = useLocation();
  const { isAuthenticated } = useAuth();

  const noLayoutPaths = ["/auth", "/login", "/signup"];
  const hideLayout = noLayoutPaths.some((path) =>
    location.pathname.startsWith(path)
  );

  return (
    <>
      {!hideLayout && <NavbarComponent />}
      {isAuthenticated && <EduconChatbot />}
      <ScrollToTop />

      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          {/* Public Routes */}
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/auth"
            element={
              <GuestRoute>
                <AuthPage />
              </GuestRoute>
            }
          />
          <Route
            path="/signup"
            element={
              <GuestRoute>
                <AuthPage />
              </GuestRoute>
            }
          />
          <Route path="/about" element={<AboutUsPage />} />
          <Route path="/admissions" element={<AdmissionPage />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
          <Route path="/university" element={<UniversityDashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />

          {/* Protected Routes */}
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route
            path="/document-verification"
            element={
              <ProtectedRoute>
                <DocumentVerification />
              </ProtectedRoute>
            }
          />

          <Route
            path="/student-application"
            element={
              <ProtectedRoute>
                <StudentApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/university-application"
            element={
              <ProtectedRoute>
                <UniversityApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/university-application-view"
            element={
              <ProtectedRoute>
                <UniversityApplicationView />
              </ProtectedRoute>
            }
          />
          <Route
            path="/subscriptions"
            element={
              <ProtectedRoute>
                <SubscriptionPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/your-application"
            element={
              <ProtectedRoute>
                <CourseApplicationPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/track-scholarship"
            element={
              <ProtectedRoute>
                <ScholarshipApplicationPage />
              </ProtectedRoute>
            }
          />

          {/* Fallback */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>

      {!hideLayout && (
        <footer>
          <FooterComponent />
        </footer>
      )}
    </>
  );
}

export default function Index() {
  return (
    <BrowserRouter>
      <Toaster position="top-right" reverseOrder={false} />
      <LayoutWrapper />
    </BrowserRouter>
  );
}
