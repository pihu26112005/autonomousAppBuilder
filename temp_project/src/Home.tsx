import React, { useState } from 'react';
import BlogModal from './BlogModal';

const blogs = [
  { id: 1, title: 'Exploring the Mountains', description: 'A journey through the rocky terrains and beautiful landscapes.' },
  { id: 2, title: 'Culinary Delights', description: 'Discovering the world of gourmet food and exquisite recipes.' },
  { id: 3, title: 'Tech Innovations', description: 'The latest advancements in technology and their impact on society.' },
  { id: 4, title: 'Art and Culture', description: 'A dive into the world of art, music, and cultural heritage.' },
  { id: 5, title: 'Travel Diaries', description: 'Experiences and stories from around the globe.' },
  { id: 6, title: 'Fitness and Health', description: 'Tips and tricks for maintaining a healthy lifestyle.' },
  { id: 7, title: 'Mindfulness and Meditation', description: 'Practices for achieving peace and tranquility.' },
  { id: 8, title: 'Sustainable Living', description: 'Ways to live a more eco-friendly and sustainable life.' }
];

function Home() {
  const [selectedBlog, setSelectedBlog] = useState(null);

  return (
    <div className="p-4">
      <h1 className="text-3xl font-bold text-center mb-6">Welcome to My Blog</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-white p-4 rounded shadow hover:shadow-lg transition-shadow cursor-pointer" onClick={() => setSelectedBlog(blog)}>
            <h2 className="text-xl font-semibold">{blog.title}</h2>
            <p className="text-gray-600">{blog.description.substring(0, 60)}...</p>
          </div>
        ))}
      </div>
      {selectedBlog && <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />}
    </div>
  );
}

export default Home;
