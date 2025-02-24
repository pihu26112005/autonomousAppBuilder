import React, { useState } from 'react';
import CreateBlogModal from './CreateBlogModal';

interface Blog {
  id: number;
  title: string;
  description: string;
}

function CreateBlog() {
  const [blogs, setBlogs] = useState<Blog[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateBlog = (title: string, description: string) => {
    const newBlog = { id: blogs.length + 1, title, description };
    setBlogs([...blogs, newBlog]);
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Create a New Blog</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        New Blog
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 rounded shadow">
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.description}</p>
          </div>
        ))}
      </div>
      {isModalOpen && <CreateBlogModal onClose={() => setIsModalOpen(false)} onCreate={handleCreateBlog} />}
    </div>
  );
}

export default CreateBlog;
