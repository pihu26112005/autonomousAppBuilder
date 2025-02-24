import React from 'react';

interface BlogModalProps {
  blog: { title: string; description: string };
  onClose: () => void;
}

function BlogModal({ blog, onClose }: BlogModalProps) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4">{blog.title}</h2>
        <p className="text-gray-700 mb-4">{blog.description}</p>
        <button
          onClick={onClose}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default BlogModal;
