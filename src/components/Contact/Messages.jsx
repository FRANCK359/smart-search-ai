import React, { useState, useEffect } from 'react';
import api from '../../services/api';
import { MailIcon, CheckIcon, XIcon } from '@heroicons/react/outline';

const Messages = () => {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedMessage, setSelectedMessage] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    const fetchMessages = async () => {
      try {
        setLoading(true);
        const response = await api.get('/contact/messages', {
          params: { page: currentPage, limit: 10 }
        });
        setMessages(response.data.messages);
        setTotalPages(response.data.pages);
      } catch (error) {
        console.error('Error fetching messages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchMessages();
  }, [currentPage]);

  const markAsRead = async (id, isRead) => {
    try {
      await api.put(`/contact/messages/${id}`, { is_read: isRead });
      setMessages(messages.map(msg => 
        msg.id === id ? { ...msg, is_read: isRead } : msg
      ));
      if (selectedMessage?.id === id) {
        setSelectedMessage({ ...selectedMessage, is_read: isRead });
      }
    } catch (error) {
      console.error('Error updating message:', error);
    }
  };

  return (
    <div className="flex flex-col md:flex-row gap-6">
      <div className={`${selectedMessage ? 'hidden md:block md:w-1/3' : 'w-full'}`}>
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
          <div className="p-4 border-b border-gray-200 dark:border-gray-700">
            <h3 className="text-lg font-medium">Contact Messages</h3>
          </div>
          
          {loading ? (
            <div className="p-4">
              {[...Array(5)].map((_, i) => (
                <div key={i} className="animate-pulse flex space-x-4 mb-4">
                  <div className="rounded-full bg-gray-300 dark:bg-gray-600 h-10 w-10"></div>
                  <div className="flex-1 space-y-2">
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded w-3/4"></div>
                    <div className="h-4 bg-gray-300 dark:bg-gray-600 rounded"></div>
                  </div>
                </div>
              ))}
            </div>
          ) : messages.length === 0 ? (
            <div className="p-4 text-center text-gray-500 dark:text-gray-400">
              No messages found
            </div>
          ) : (
            <ul className="divide-y divide-gray-200 dark:divide-gray-700">
              {messages.map((message) => (
                <li 
                  key={message.id}
                  onClick={() => setSelectedMessage(message)}
                  className={`p-4 hover:bg-gray-50 dark:hover:bg-gray-700 cursor-pointer ${!message.is_read ? 'bg-blue-50 dark:bg-blue-900/20' : ''} ${selectedMessage?.id === message.id ? 'bg-gray-100 dark:bg-gray-700' : ''}`}
                >
                  <div className="flex justify-between">
                    <h4 className="font-medium truncate">{message.name}</h4>
                    <span className="text-xs text-gray-500 dark:text-gray-400">
                      {new Date(message.created_at).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-sm text-gray-600 dark:text-gray-300 truncate">{message.subject}</p>
                </li>
              ))}
            </ul>
          )}

          {totalPages > 1 && (
            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-between">
              <button
                onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                disabled={currentPage === 1}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
              >
                Previous
              </button>
              <span className="text-sm text-gray-600 dark:text-gray-300">
                Page {currentPage} of {totalPages}
              </span>
              <button
                onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                disabled={currentPage === totalPages}
                className="px-3 py-1 rounded-md bg-gray-100 dark:bg-gray-700 disabled:opacity-50"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>

      {selectedMessage && (
        <div className={`${selectedMessage ? 'w-full md:w-2/3' : 'hidden'}`}>
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden">
            <div className="p-4 border-b border-gray-200 dark:border-gray-700 flex justify-between items-center">
              <h3 className="text-lg font-medium">{selectedMessage.subject}</h3>
              <button 
                onClick={() => setSelectedMessage(null)}
                className="md:hidden text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300"
              >
                <XIcon className="h-5 w-5" />
              </button>
            </div>
            
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <div className="flex justify-between items-start">
                <div>
                  <p className="font-medium">{selectedMessage.name}</p>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{selectedMessage.email}</p>
                </div>
                <div className="text-sm text-gray-500 dark:text-gray-400">
                  {new Date(selectedMessage.created_at).toLocaleString()}
                </div>
              </div>
            </div>

            <div className="p-4">
              <p className="whitespace-pre-line">{selectedMessage.message}</p>
            </div>

            <div className="p-4 border-t border-gray-200 dark:border-gray-700 flex justify-end space-x-2">
              <button
                onClick={() => markAsRead(selectedMessage.id, !selectedMessage.is_read)}
                className={`flex items-center px-3 py-1 rounded-md ${selectedMessage.is_read ? 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-800 dark:text-yellow-200' : 'bg-green-100 dark:bg-green-900/30 text-green-800 dark:text-green-200'}`}
              >
                {selectedMessage.is_read ? (
                  <>
                    <XIcon className="h-4 w-4 mr-1" />
                    Mark Unread
                  </>
                ) : (
                  <>
                    <CheckIcon className="h-4 w-4 mr-1" />
                    Mark Read
                  </>
                )}
              </button>
              <a
                href={`mailto:${selectedMessage.email}`}
                className="flex items-center px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 rounded-md"
              >
                <MailIcon className="h-4 w-4 mr-1" />
                Reply
              </a>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Messages;