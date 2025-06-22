import React from 'react';
import Messages from '../components/Contact/Messages';
import { useAuth } from '../hooks/useAuth';

const AdminMessages = () => {
  const { user } = useAuth();

  if (!user || !user.is_admin) {
    return (
      <div className="py-12 text-center">
        <h3 className="text-lg font-medium text-gray-600 dark:text-gray-300">
          Unauthorized - Admin access required
        </h3>
      </div>
    );
  }

  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <h1 className="text-2xl font-bold mb-6">Contact Messages</h1>
        <Messages />
      </div>
    </div>
  );
};

export default AdminMessages;