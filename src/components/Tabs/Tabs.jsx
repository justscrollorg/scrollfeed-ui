import React, { useState, useEffect } from "react";
import { fetchTopVideos, fetchCategories } from "../../services/api";
import VideoCard from "../VideoCard/VideoCard";

function Tabs({ selectedRegion }) {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    fetchCategories(selectedRegion).then((cats) => {
      setTabs(cats);
      if (cats.length > 0) {
        setActive(cats[0].id);
        fetchTopVideos(selectedRegion, cats[0].id, 20).then((data) =>
          setVideos((prev) => ({ ...prev, [cats[0].id]: data }))
        );
      }
    });
  }, [selectedRegion]);

  const handleTabClick = (catId) => {
    setActive(catId);
    if (!videos[catId]) {
      fetchTopVideos(selectedRegion, catId, 20).then((data) =>
        setVideos((prev) => ({ ...prev, [catId]: data }))
      );
    }
  };

  return (
    <div className="mt-8">
      <div className="flex flex-wrap gap-4 border-b pb-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleTabClick(tab.id)}
            className={`px-4 py-2 rounded-t-lg ${
              active === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.title}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {videos[active]?.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Tabs;
