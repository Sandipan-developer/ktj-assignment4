import { useLocation } from 'react-router-dom';
import { useState } from 'react';
import axios from 'axios';

export default function ArticleDetail() {
  const { state: article } = useLocation();
  const [summary, setSummary] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSummarize = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await axios.post("http://localhost:5000/api/summarize-article", {
        text: article.content || article.description || article.title,
      });
      setSummary(res.data.summary);
    } catch (err) {
      setError('Failed to summarize article.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 pt-24">
      <h1 className="text-2xl font-bold mb-2">{article.title}</h1>
      <p className="text-gray-600 mb-4">
        {article.author || 'Unknown'} · {new Date(article.publishedAt).toLocaleString()}
      </p>

      {article.urlToImage && (
        <img src={article.urlToImage} alt="" className="mb-4 w-full h-auto rounded" />
      )}

      <p className="mb-6">{article.description || 'No description available.'}</p>

      <button
        onClick={handleSummarize}
        className="bg-blue-600 text-white px-4 py-2 rounded mb-4"
      >
        {loading ? 'Summarizing...' : 'Summarize'}
      </button>

      {error && <p className="text-red-500">{error}</p>}

      {summary && (
        <div className="bg-gray-100 p-4 rounded mb-4">
          <h2 className="font-bold mb-2">🔍 Summary</h2>
          {summary.split('\n').map((line, i) => (
            <p key={i} className="list-disc ml-5">{line}</p>
          ))}
        </div>
      )}

      <a
        href={article.url}
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-600 underline"
      >
        Read Full Article
      </a>
    </div>
  );
}



