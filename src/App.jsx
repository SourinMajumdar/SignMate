import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import BuilderPage from "./pages/BuilderPage";
import TemplatesPage from "./pages/TemplatesPage";
import DocsPage from "./pages/DocsPage";

export default function App() {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/builder" element={<BuilderPage />} />
      <Route path="/templates" element={<TemplatesPage />} />
      <Route path="/docs" element={<DocsPage />} />
    </Routes>
  );
}
