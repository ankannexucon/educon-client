import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/navigation/NavbarComponent";
import DocumentVerification from "../components/DocumentVerification";
import FooterComponent from "../components/footer/FooterComponent";
import AdmissionPage from "../pages/Admission/admissionPage";
// import CVBuilder from "../pages/profile/CVBuilder";
import StudentApplicationPage from "../pages/application/StudentApplicationPage";
import AboutUsPage from "../pages/info/AboutUsPage";

// Lazy imports
const LandingPage = lazy(() => import("../pages/dashboard/LandingPage"));
const UniversityDashboardPage = lazy(() =>
  import("../pages/dashboard/UniversityDashboardPage")
);
const UserProfile = lazy(() => import("../pages/profile/UserProfilePage"));
const CoursesPage = lazy(() => import("../pages/course/CoursesPage"));
const AuthPage = lazy(() => import("../pages/authentication/AuthPage"));
const SubscriptionPage = lazy(() => import("../pages/subscriptions/subscriptions"));

export default function Index() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/signup" element={<AuthPage mode={"signup"} />} />
          <Route path="/login" element={<AuthPage mode={"login"} />} />
          <Route path="/profile" element={<UserProfile />} />
          
  
        <Route path="/document-verification" element={<DocumentVerification />} />
          <Route path="/admissions" element={<AdmissionPage />} />
          <Route path="/university" element={<UniversityDashboardPage />} />
          <Route path="/courses" element={<CoursesPage />} />
          <Route path="/about" element={<AboutUsPage/>} />
          <Route
            path="/student-application"
            element={<StudentApplicationPage />}
          />
          <Route path="/subscriptions" element={<SubscriptionPage />} />
          <Route path="*" element={<div>404 Not Found</div>} />
        </Routes>
      </Suspense>
      <footer>
        <FooterComponent />
      </footer>
    </BrowserRouter>
  );
}