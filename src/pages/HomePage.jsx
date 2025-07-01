import { useState, useEffect } from 'react';
import CategoryTabs from '../components/CategoryTabs';
import ArticleCard from '../components/ArticleCard';
import axios from 'axios';

export default function HomePage() {
  const [category, setCategory] = useState('business');
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchArticles = async () => {
      setLoading(true);
      setError('');
      try {
        const res = await axios.get("http://localhost:5000/api/news", {
          params:
            { category },
        }
        );
        
 
        setArticles(res.data.articles || []);
      } catch (err) {
        console.error('NewsAPI error:', err.message);
        setError('Error fetching news.');
      } finally {
        setLoading(false);
      }
    };
    fetchArticles();
  }, [category]);

  return (
    <div className="pt-6">
      <CategoryTabs category={category} setCategory={setCategory} />

      {loading && <p className="mt-4 text-center">Loading...</p>}
      {error && <p className="text-red-500 mt-4 text-center">{error}</p>}
      {!loading && articles.length === 0 && (
        <p className="mt-4 text-center">No articles found.</p>
      )}

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-6">
        {articles.map((a, i) => (
          <ArticleCard key={i} article={a} />
        ))}
      </div>
    </div>
  );
}






