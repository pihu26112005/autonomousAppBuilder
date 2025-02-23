import React from 'react';
import { Twitter, Facebook, Instagram } from 'lucide-react';

interface BlogPostProps {
  title: string;
  content: string;
  imageUrl: string;
}

const BlogPost: React.FC<BlogPostProps> = ({ title, content, imageUrl }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
      <img src={imageUrl} alt={title} className="w-full h-64 object-cover" />
      <div className="p-6">
        <h2 className="text-2xl font-bold mb-2">{title}</h2>
        <p className="text-gray-700 mb-4">{content}</p>
        <div className="flex space-x-4">
          <Twitter className="w-6 h-6 text-blue-500 cursor-pointer" />
          <Facebook className="w-6 h-6 text-blue-700 cursor-pointer" />
          <Instagram className="w-6 h-6 text-pink-500 cursor-pointer" />
        </div>
      </div>
    </div>
  );
};

export default BlogPost;
