import React, { useState, useEffect } from "react";
import { fetchTopVideos, fetchCategories } from "../../services/api";
import VideoCard from "../VideoCard/VideoCard";

function Tabs({ selectedRegion }) {
  const [tabs, setTabs] = useState([]);
  const [active, setActive] = useState(null);
  const [videos, setVideos] = useState({});

  useEffect(() => {
    const regionKey = `activeTab_${selectedRegion}`;

    fetchCategories(selectedRegion).then((cats) => {
      setTabs(cats);

      // Try to use region-specific saved tab
      const cachedTabId = localStorage.getItem(regionKey);
      const validCachedTab = cats.find((c) => c.id === cachedTabId);

      // Prefer "News & Politics"
      const newsTab = cats.find(
        (c) => c.title.toLowerCase() === "news & politics"
      );
      const defaultTab = validCachedTab || newsTab || cats[0];

      if (defaultTab) {
        setActive(defaultTab.id);
        localStorage.setItem(regionKey, defaultTab.id);

        fetchTopVideos(selectedRegion, defaultTab.id, 20).then((data) =>
          setVideos((prev) => ({ ...prev, [defaultTab.id]: data }))
        );
      }
    });
  }, [selectedRegion]);

  const handleTabClick = (catId) => {
    setActive(catId);
    localStorage.setItem(`activeTab_${selectedRegion}`, catId);

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
            className={`px-4 py-2 rounded-t-lg relative ${
              active === tab.id
                ? "bg-blue-600 text-white"
                : "bg-gray-100 hover:bg-gray-200"
            }`}
          >
            {tab.title}
            {tab.title.toLowerCase() === "news & politics" && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs px-2 py-0.5 rounded-full">
                Default
              </span>
            )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-6">
        {videos[active]?.map((video) => (
          <VideoCard key={video.id?.videoId || video.id} video={video} />
        ))}
      </div>
    </div>
  );
}

export default Tabs;
