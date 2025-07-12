import { Routes, Route } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import ArticlesPage from "./pages/ArticlesPage";
import JokesPage from "./pages/JokesPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<VideoPage />} />
          <Route path="/articles" element={<ArticlesPage />} />
          <Route path="/jokes" element={<JokesPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
