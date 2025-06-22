import React from 'react';

const About = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">About IntelliSearch</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Mission</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            At IntelliSearch, we're revolutionizing the way people find information online. 
            Our mission is to provide the most accurate, relevant, and intelligent search 
            results powered by cutting-edge AI technology.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            We believe that searching should be more than just keywords and links - 
            it should understand context, provide summaries, and help you find exactly 
            what you're looking for faster.
          </p>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <h2 className="text-2xl font-semibold mb-4">Our Technology</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            IntelliSearch combines several advanced technologies to deliver superior results:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300">
            <li>Natural Language Processing to understand search intent</li>
            <li>Machine Learning algorithms to rank and refine results</li>
            <li>AI-powered summarization to save you time</li>
            <li>Advanced web crawling and indexing</li>
          </ul>
        </div>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">The Team</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We're a passionate team of engineers, data scientists, and designers 
            dedicated to building the best search experience possible.
          </p>
          <p className="text-gray-600 dark:text-gray-300">
            Our diverse backgrounds and expertise allow us to approach search 
            challenges from multiple perspectives, resulting in innovative solutions.
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;