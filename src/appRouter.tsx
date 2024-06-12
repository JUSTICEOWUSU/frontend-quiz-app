import { Suspense } from 'react'
import Layout from './pages/layouts/AppLayout';
import ResultPage from './pages/resultPage/Result';
import LoadingSpinner from "./components/LoadingSpinner/LoadingSpinner";
import SubjectPage from './pages/subjectPage/Subject';
import FallBackUI from './pages/fallBackUI/FallBackUI';
import HeroPage from './pages/heroPage/Hero';
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
