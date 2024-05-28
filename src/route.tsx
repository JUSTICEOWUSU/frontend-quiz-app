import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Hero from "./pages/hero/Hero";
import Result from "./pages/result/Result";
import Subject from "./pages/subject/Subject";


function RouteConfig() {

  return (
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route index element={<Hero />} />
              <Route path="/:subject" element={<Subject />} />
              <Route path="/result" element={<Result />} />
            </Route>
          </Routes>
        </Router>

    );
}

export default RouteConfig
