import Hero from "./pages/heroPage/Hero";
import Result from "./pages/resultPage/Result";
import Subject from "./pages/subjectPage/Subject";
import Layout from "./components/layout/Layout";
import FallBackUI from "./components/fallBackUI/FallBackUI";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

function RouteConfig() {

  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Hero />} />
          <Route path=":subject" element={<Subject />} />
          <Route path=":subject/result" element={<Result />} />
          <Route path="Error" element={<FallBackUI />} />
          <Route path="*" element={<FallBackUI />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default RouteConfig
