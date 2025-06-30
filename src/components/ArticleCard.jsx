import { useNavigate } from 'react-router-dom';

export default function ArticleCard({ article }) {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/article/${encodeURIComponent(article.url)}`, {
      state: article,
    });
  };

  return (
    <div
      className="border rounded shadow-sm hover:shadow-md cursor-pointer p-3 transition"
      onClick={handleClick}
    >
      {article.urlToImage && (
        <img
          src={article.urlToImage}
          alt="thumbnail"
          className="w-full h-40 object-cover mb-2 rounded"
        />
      )}
      <h3 className="font-semibold text-lg">{article.title}</h3>
      <p className="text-sm text-gray-600 mt-1">{article.source?.name}</p>
    </div>
  );
}



