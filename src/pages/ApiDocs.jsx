import React from 'react';

const ApiDocs = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">API Documentation</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Introduction</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            The IntelliSearch API allows developers to integrate our powerful search 
            capabilities into their own applications.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            All API endpoints require authentication using your API key.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Authentication</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            Include your API key in the Authorization header:
          </p>
          <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-4">
            <code className="text-sm">
              Authorization: Bearer YOUR_API_KEY
            </code>
          </div>
          <p className="text-gray-600 dark:text-gray-300">
            You can find your API key in your dashboard.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Endpoints</h2>
          
          <div className="mb-6">
            <h3 className="text-xl font-medium mb-2">Search</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-2">
              <code className="text-sm">
                POST /api/v1/search
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-300 mb-2">Parameters:</p>
            <ul className="list-disc pl-5 space-y-1 text-gray-600 dark:text-gray-300 mb-2">
              <li><code>query</code>: The search query (required)</li>
              <li><code>type</code>: Search type (text, image, news)</li>
              <li><code>limit</code>: Number of results to return</li>
            </ul>
          </div>
          
          <div>
            <h3 className="text-xl font-medium mb-2">Get Search History</h3>
            <div className="bg-gray-100 dark:bg-gray-700 p-4 rounded-md mb-2">
              <code className="text-sm">
                GET /api/v1/search/history
              </code>
            </div>
            <p className="text-gray-600 dark:text-gray-300">
              Returns the user's recent search history.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ApiDocs;