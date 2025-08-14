import React, { useEffect, useState } from "react";
import axios from "axios";

const MemesPage = () => {
  const [memes, setMemes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    axios
      .get("/api/memes/trending")
      .then((res) => {
        setMemes(res.data);
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to load memes");
        setLoading(false);
      });
  }, []);

  if (loading) return <div>Loading memes...</div>;
  if (error) return <div>{error}</div>;

  return (
    <div className="container mx-auto py-6">
      <h1 className="text-2xl font-bold mb-4">Trending Memes</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
        {memes.map((meme) => (
          <div key={meme.image_url} className="bg-white rounded shadow p-4 flex flex-col items-center">
            <img src={meme.image_url} alt={meme.title} className="w-full h-auto rounded mb-2" />
            <div className="font-semibold text-center mb-1">{meme.title}</div>
            <a href={meme.permalink} target="_blank" rel="noopener noreferrer" className="text-blue-500 text-sm">View Source</a>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MemesPage;
