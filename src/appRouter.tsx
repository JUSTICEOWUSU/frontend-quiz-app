import { lazy, Suspense } from 'react'
const HeroPage = lazy(() => import("./pages/heroPage/Hero"));
const Layout = lazy(() => import("./components/layout/Layout"));
const ResultPage = lazy(() => import("./pages/resultPage/Result"));
const SubjectPage = lazy(() => import("./pages/subjectPage/Subject"));
const FallBackUI = lazy(() => import("./pages/fallBackUI/FallBackUI"));
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function RouteConfig() {

  return (
    <Router>
      <Suspense fallback={<LoadingSpinner/>}>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<HeroPage />} />
            <Route path=":subject" element={<SubjectPage />} />
            <Route path=":subject/result" element={<ResultPage />} />
            <Route path="Error" element={<FallBackUI />} />
            <Route path="*" element={<FallBackUI />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
}

export default RouteConfig
