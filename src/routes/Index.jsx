import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import NavbarComponent from "../components/navigation/NavbarComponent";
import DocumentVerification from "../components/DocumentVerification";
// Lazy imports
const UserProfile = lazy(() => import("../pages/profile/UserProfilePage"));

export default function Index() {
  return (
    <BrowserRouter>
      <NavbarComponent />
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Routes>
        <Route path="/" element={<div>App</div>} />
        <Route path="/profile" element={<UserProfile />} />
        <Route path="/fraude-detection" element={<DocumentVerification />} />
        
      </Routes>
    </BrowserRouter>
  );
}
