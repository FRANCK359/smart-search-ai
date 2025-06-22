import React from 'react';

const Terms = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Terms of Service</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Last Updated:</strong> January 1, 2023
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            By accessing or using the IntelliSearch service, you agree to be bound by these Terms of Service. 
            If you disagree with any part of the terms, you may not access the service.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Use of Service</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            IntelliSearch provides an AI-powered search service. You may use this service for personal or 
            commercial purposes, subject to these terms.
          </p>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            You agree not to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
            <li>Use the service for any illegal purpose</li>
            <li>Attempt to reverse engineer or hack the service</li>
            <li>Use automated systems to access the service excessively</li>
            <li>Violate any laws in your jurisdiction</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Intellectual Property</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            The service and its original content, features, and functionality are owned by IntelliSearch and 
            are protected by international copyright, trademark, and other intellectual property laws.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Limitation of Liability</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            In no event shall IntelliSearch be liable for any indirect, incidental, special, consequential 
            or punitive damages arising out of or related to your use of the service.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Changes to Terms</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We reserve the right to modify these terms at any time. Your continued use of the service after 
            any such changes constitutes your acceptance of the new terms.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about these Terms, please contact us at{' '}
            <a href="mailto:legal@intellisearch.com" className="text-primary-600 dark:text-primary-400 hover:underline">
              legal@intellisearch.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Terms;