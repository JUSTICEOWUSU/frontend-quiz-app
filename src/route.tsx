import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Hero from "./pages/hero/Hero";
import Result from "./pages/result/Result";
import Subject from "./pages/subject/Subject";
import FallBackUI from "./components/fallBackUI/FallBackUI";


function RouteConfig() {

  return (
    <Router>
      <Routes>
        <Route element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path="/:subject" element={<Subject />} />
          <Route path="/:subject/result" element={<Result />} />
          <Route path="/Error" element={<FallBackUI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouteConfig
