import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/navigation/NavbarComponent";
import FooterComponent from "../components/footer/FooterComponent";

// Lazy imports
const LandingPage = lazy(() => import("../pages/dashboard/LandingPage"));
const UniversityDashboardPage = lazy(() =>
  import("../pages/dashboard/UniversityDashboardPage")
);
const UserProfile = lazy(() => import("../pages/profile/UserProfilePage"));
const CoursesPage = lazy(() => import("../pages/course/CoursesPage"));
const AuthPage = lazy(() => import("../pages/authentication/AuthPage"));

export default function Index() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/auth" element={<AuthPage />} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/university" element={<UniversityDashboardPage />} />
        <Route path="/courses" element={<CoursesPage />} />
      </Routes>
      <footer>
        <FooterComponent />
      </footer>
    </BrowserRouter>
  );
}
