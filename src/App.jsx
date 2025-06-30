import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ArticleDetail from './pages/ArticleDetail';
import MySummaries from './pages/MySummaries';

function App() {
  return (
    <BrowserRouter>
      <Navbar />
      <div className="pt-20 px-4">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/saved" element={<MySummaries />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;















