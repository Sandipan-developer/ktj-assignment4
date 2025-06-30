export default function CategoryTabs({ category, setCategory }) {
  const categories = ['business', 'technology', 'sports', 'health'];

  return (
    <div className="flex flex-wrap gap-3 my-4 justify-center">
      {categories.map((cat) => (
        <button
          key={cat}
          onClick={() => setCategory(cat)}
          className={`px-4 py-2 rounded 
            ${category === cat ? 'bg-blue-600 text-white' : 'bg-gray-200 text-black'}
            hover:bg-blue-500 hover:text-white transition`}
        >
          {cat.charAt(0).toUpperCase() + cat.slice(1)}
        </button>
      ))}
    </div>
  );
}



  