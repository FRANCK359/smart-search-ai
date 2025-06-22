import React from 'react';

const Privacy = () => {
  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Privacy Policy</h1>
        
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 mb-8">
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            <strong>Last Updated:</strong> January 1, 2023
          </p>
          
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            At IntelliSearch, we take your privacy seriously. This Privacy Policy explains how we collect, use, disclose, 
            and safeguard your information when you use our service.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Information We Collect</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We may collect personal information that you voluntarily provide to us when you register, 
            use our search service, or contact us. This may include:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
            <li>Email address</li>
            <li>Username</li>
            <li>Search queries</li>
            <li>IP address and device information</li>
            <li>Any other information you choose to provide</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">How We Use Your Information</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            We use the information we collect to:
          </p>
          <ul className="list-disc pl-5 space-y-2 text-gray-600 dark:text-gray-300 mb-6">
            <li>Provide and maintain our service</li>
            <li>Improve and personalize your search experience</li>
            <li>Develop new features and functionality</li>
            <li>Communicate with you about updates and support</li>
            <li>Monitor and analyze usage patterns</li>
          </ul>

          <h2 className="text-2xl font-semibold mb-4">Data Security</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We implement appropriate technical and organizational measures to protect your personal information. 
            However, no method of transmission over the Internet or electronic storage is 100% secure, so we 
            cannot guarantee absolute security.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Changes to This Policy</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-6">
            We may update our Privacy Policy from time to time. We will notify you of any changes by posting 
            the new Privacy Policy on this page and updating the "Last Updated" date.
          </p>

          <h2 className="text-2xl font-semibold mb-4">Contact Us</h2>
          <p className="text-gray-600 dark:text-gray-300">
            If you have any questions about this Privacy Policy, please contact us at{' '}
            <a href="mailto:privacy@intellisearch.com" className="text-primary-600 dark:text-primary-400 hover:underline">
              privacy@intellisearch.com
            </a>.
          </p>
        </div>
      </div>
    </div>
  );
};

export default Privacy;