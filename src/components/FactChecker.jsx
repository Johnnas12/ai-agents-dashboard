import React, { useEffect, useState } from "react";
import axios from "axios";

function FactChecker() {
  const [news, setNews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [factCheckResults, setFactCheckResults] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/trending-news")
      .then((response) => {
        setNews(response.data.trending_news);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching news:", error);
        setLoading(false);
      });
  }, []);

  const handleFactCheck = (url) => {
    setLoading(true);
    axios
      .post("/api/fact-check", { url })
      .then((response) => {
        setFactCheckResults((prev) => [
          ...prev,
          { url, result: response.data },
        ]);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error checking fact:", error);
        setLoading(false);
      });
  };

  return (
    <div className="p-6 flex flex-col items-center">
      <h2 className="text-3xl font-bold mb-8 text-white">📰 News Fact-Checker</h2>

      {loading ? (
        <div className="flex justify-center items-center h-40">
          <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-green-500"></div>
        </div>
      ) : (
        <div className="w-full max-w-4xl space-y-6">
          {news.length > 0 ? (
            news.map((article) => (
              <div
                key={article.id}
                className="bg-gray-800 rounded-2xl overflow-hidden shadow-xl border border-gray-700"
              >
                {/* Image */}
                {article.urlToImage && (
                  <img
                    src={article.urlToImage}
                    alt={article.title}
                    className="w-full h-64 object-cover"
                  />
                )}

                {/* News Content */}
                <div className="p-6">
                  <h3 className="text-2xl font-semibold text-white mb-2">
                    {article.title}
                  </h3>
                  <p className="text-gray-300 mb-2">{article.description}</p>

                  <div className="flex justify-between items-center mt-4">
                    <a
                      href={article.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-400 underline"
                    >
                      Read Full Article
                    </a>
                    <button
                      onClick={() => handleFactCheck(article.url)}
                      className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600 transition"
                    >
                      ✅ Fact Check
                    </button>
                  </div>

                  {/* Fact-Check Result */}
                  {factCheckResults
                    .filter((result) => result.url === article.url)
                    .map((result, idx) => (
                      <div
                        key={idx}
                        className="mt-6 bg-gray-700 p-4 rounded-lg border border-green-500"
                      >
                        <h4 className="font-bold text-white mb-2">
                          📝 Fact-Check Result:
                        </h4>
                        <p className="text-white mb-1">
                          <span className="font-semibold">Verdict:</span>{" "}
                          {result.result.verdict}
                        </p>
                        <p className="text-white mb-2">
                          <span className="font-semibold">Legitimacy Score:</span>{" "}
                          {result.result.legitimacy_score}%
                        </p>
                        <ul className="list-disc ml-5 text-white">
                          {result.result.reasoning.map((reason, i) => (
                            <li key={i}>{reason}</li>
                          ))}
                        </ul>
                      </div>
                    ))}
                </div>
              </div>
            ))
          ) : (
            <p className="text-white text-center">No news available.</p>
          )}
        </div>
      )}
    </div>
  );
}

export default FactChecker;
