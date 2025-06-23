import React from 'react';
import { Link } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import InovLogo from '../assets/Inov.png';

const Home = () => {
  return (
    <div className="min-h-screen py-12 bg-gradient-to-b from-blue-50 to-white dark:from-gray-900 dark:to-gray-800">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <div className="flex justify-center mb-6">
            <div className="flex items-center space-x-3">
              <img 
                src={InovLogo} 
                alt="InovGenius Logo" 
                className="h-14 w-14 rounded-full object-cover shadow-lg"
              />
              <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">
                InovGenius
              </h1>
            </div>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold mb-6 text-gray-800 dark:text-white">
            Revolutionize Your <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:to-purple-400">Search Experience</span>
          </h2>
          
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto mb-10">
            Harness the power of next-generation AI to uncover insights, patterns and knowledge like never before.
          </p>
          
          {/* Search Bar */}
          <div className="max-w-2xl mx-auto mb-16 transform transition-all duration-300 hover:scale-[1.01]">
            <SearchBar />
          </div>
        </div>
        
        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-20">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-purple-500">
            <div className="bg-blue-100 dark:bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Cognitive Search</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Our neural search understands context, intent and semantics for unparalleled accuracy.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-purple-500">
            <div className="bg-purple-100 dark:bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-purple-600 dark:text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Lightning Fast</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Quantum-inspired algorithms deliver results in milliseconds, even for complex queries.
            </p>
          </div>
          
          <div className="bg-white dark:bg-gray-800 p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow border border-gray-100 dark:border-gray-700 hover:border-blue-200 dark:hover:border-purple-500">
            <div className="bg-gradient-to-r from-blue-100 to-purple-100 dark:bg-gray-700 w-16 h-16 rounded-lg flex items-center justify-center mx-auto mb-6">
              <svg className="h-8 w-8 text-gradient-to-r from-blue-600 to-purple-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <h3 className="text-2xl font-bold text-center mb-4 text-gray-800 dark:text-white">Adaptive Intelligence</h3>
            <p className="text-gray-600 dark:text-gray-300 text-center">
              Continuously learning system that evolves with your needs and preferences.
            </p>
          </div>
        </div>
        
        {/* CTA Section */}
        <div className="text-center">
          <h3 className="text-2xl font-semibold mb-6 text-gray-700 dark:text-gray-200">
            Ready to experience the future of search?
          </h3>
          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <Link
              to="/search"
              className="px-8 py-4 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl hover:from-blue-700 hover:to-purple-700 transition-all shadow-lg hover:shadow-xl font-medium"
            >
              Start Searching Now
            </Link>
            <Link
              to="/about"
              className="px-8 py-4 border-2 border-blue-600 text-blue-600 dark:border-purple-400 dark:text-purple-400 rounded-xl hover:bg-blue-50 dark:hover:bg-gray-700 transition-all font-medium"
            >
              Discover Our Technology
            </Link>
          </div>
        </div>

        {/* Trust Badges */}
        <div className="mt-20 flex flex-wrap justify-center gap-8 items-center opacity-80">
          <span className="text-gray-500 dark:text-gray-400 text-sm">TRUSTED BY INNOVATORS WORLDWIDE</span>
          <div className="flex flex-wrap justify-center gap-6">
            {['TechPioneers', 'AI Labs', 'Future Inc', 'Quantum Group'].map((company) => (
              <div key={company} className="text-gray-700 dark:text-gray-300 font-medium px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm">
                {company}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;