import { Suspense, lazy } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

export default function Index() {
  return (
    <BrowserRouter>
      <Suspense fallback={<div>Loading...</div>}></Suspense>
      <Routes>

        <Route path="/fraude-detection " element={lazy(() => import("../App"))()} />
      </Routes>
    </BrowserRouter>
  );
}
