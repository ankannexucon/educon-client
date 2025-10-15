import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import NavbarComponent from "../components/navigation/NavbarComponent";
import DocumentVerification from "../components/DocumentVerification";
import FooterComponent from "../components/footer/FooterComponent";
import AdmissionPage from "../pages/Admission/admissionPage";
import StudentApplicationPage from "../pages/application/StudentApplicationPage";
import AboutUsPage from "../pages/info/AboutUsPage";
import NotFoundPage from "../pages/info/NotFoundPage";
import ScrollToTop from "../utils/ScrollToTop";
import UniversityApplicationPage from "../pages/application/UniversityApplicationPage";
import UniversityApplicationView from "../pages/application/UniversityApplicationView";
import EduconChatbot from "../components/EduconChatbot";
import { useAuth } from "../contexts/authContext";
import CourseApplicationPage from "../pages/application/CourseApplicationPage";
import ScholarshipApplicationPage from "../pages/application/ScholarshipApplicationPage";
import ScholarshipPage from "../pages/Admission/ScholarshipPage";
import { Toaster } from "react-hot-toast";

// Lazy imports
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
          <Route path="/" element={<LandingPage />} />
          <Route path="/auth" element={<AuthPage />} />
          <Route path="/signup" element={<AuthPage />} />
          <Route path="/profile" element={<UserProfile />} />
          <Route
            path="/document-verification"
            element={<DocumentVerification />}
          />
          <Route path="/admissions" element={<AdmissionPage />} />
          <Route path="/scholarships" element={<ScholarshipPage />} />
          <Route path="/university" element={<UniversityDashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutUsPage />} />
          <Route
            path="/student-application"
            element={<StudentApplicationPage />}
          />
          <Route
            path="/university-application"
            element={<UniversityApplicationPage />}
          />
          <Route
            path="/university-application-view"
            element={<UniversityApplicationView />}
          />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="/your-application" element={<CourseApplicationPage />} />
          <Route path="/track-scholarship" element={<ScholarshipApplicationPage />} />
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
