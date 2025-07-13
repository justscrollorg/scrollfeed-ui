import { Routes, Route } from "react-router-dom";
import VideoPage from "./pages/VideoPage";
import NewsArticlesPage from "./pages/NewsArticlesPage";
import JokesPage from "./pages/JokesPage";
import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import WikipediaArticlesPage from "./pages/WikipediaArticlesPage";

function App() {
  return (
    <>
      <Navbar />
      <div className="max-w-7xl mx-auto px-4 py-8 font-sans text-gray-800 dark:text-gray-100">
        <Routes>
          <Route path="/" element={<WikipediaArticlesPage />} />
          <Route path="/newsarticles" element={<NewsArticlesPage />} />
          <Route path="/videos" element={<VideoPage />} />
          <Route path="/jokes" element={<JokesPage />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
}

export default App;
