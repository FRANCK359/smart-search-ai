import React, { useState } from 'react';

const Faq = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const faqs = [
    {
      question: "How does IntelliSearch work?",
      answer: "IntelliSearch uses advanced AI algorithms to understand your search queries and provide the most relevant results. It analyzes the context of your search, not just keywords, to deliver better answers."
    },
    {
      question: "Is IntelliSearch free to use?",
      answer: "Yes, our basic search functionality is completely free. We also offer premium features for power users and businesses."
    },
    {
      question: "How do I save my favorite search results?",
      answer: "Simply click the star icon next to any search result to save it to your favorites. You can access all your saved items in the Dashboard."
    },
    {
      question: "Can I use IntelliSearch on my mobile device?",
      answer: "Absolutely! IntelliSearch is fully responsive and works on all devices including smartphones and tablets."
    },
    {
      question: "How does the AI summarization work?",
      answer: "Our AI analyzes the content of web pages and extracts key information to create concise summaries. This helps you quickly understand the content without reading the entire page."
    },
    {
      question: "Is my search history private?",
      answer: "Yes, we take your privacy seriously. Your search history is only visible to you and is never shared with third parties. You can delete your history at any time."
    }
  ];

  const toggleAccordion = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };

  return (
    <div className="py-12">
      <div className="max-w-4xl mx-auto px-4">
        <h1 className="text-3xl font-bold mb-8">Frequently Asked Questions</h1>
        
        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div key={index} className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
              <button
                onClick={() => toggleAccordion(index)}
                className="w-full px-6 py-4 text-left focus:outline-none"
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium text-gray-900 dark:text-white">
                    {faq.question}
                  </h2>
                  <svg
                    className={`h-6 w-6 transform transition-transform duration-200 ${activeIndex === index ? 'rotate-180' : ''}`}
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                  </svg>
                </div>
              </button>
              {activeIndex === index && (
                <div className="px-6 pb-4">
                  <p className="text-gray-600 dark:text-gray-300">{faq.answer}</p>
                </div>
              )}
            </div>
          ))}
        </div>

        <div className="mt-12 bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
          <h2 className="text-2xl font-semibold mb-4">Still have questions?</h2>
          <p className="text-gray-600 dark:text-gray-300 mb-4">
            If you didn't find what you were looking for, feel free to contact our support team.
          </p>
          <a
            href="/contact"
            className="inline-block px-6 py-3 bg-primary-600 text-white rounded-md hover:bg-primary-700"
          >
            Contact Support
          </a>
        </div>
      </div>
    </div>
  );
};

export default Faq;