import React from "react";

function Footer() {
  return (
    <footer className="bg-white dark:bg-gray-900 text-gray-600 dark:text-gray-400 text-sm text-center mt-12 py-6 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-6xl mx-auto px-4 space-y-2">
        <p className="text-gray-500 font-artistic text-base">
          This site uses the Public official APIs to display publicly available metadata.
        </p>

        <p className="text-xs text-gray-400 mt-2 font-artistic">
          © {new Date().getFullYear()} Just Scroll by Anurag Kumar. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
