import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="text-gray-500">
          This site uses the YouTube Data API to display publicly available videos and metadata.
          All video content and thumbnails are property of their respective YouTube creators.
          This app is not affiliated with or endorsed by YouTube or Google.
        </p>

        <div className="flex justify-center items-center gap-2 mt-2">
          <span>Powered by</span>
          <a
            href="https://www.youtube.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="YouTube"
          >
            <img
              src="https://upload.wikimedia.org/wikipedia/commons/b/b8/YouTube_Logo_2017.svg"
              alt="YouTube Logo"
              className="h-5"
            />
          </a>
        </div>

        <a
          href="https://www.youtube.com/t/terms"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-500 hover:underline block"
        >
          View YouTube Terms of Service
        </a>

        <p className="text-xs text-gray-400 mt-2">
          © {new Date().getFullYear()} Reactions by Anurag Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
