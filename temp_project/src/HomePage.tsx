import React from 'react';
import { Link } from 'react-router-dom';
import { Twitter, Instagram, Facebook } from 'lucide-react';

const HomePage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">My Personal Blog</h1>
        <nav className="mt-2">
          <Link to="/" className="mr-4">Home</Link>
          <Link to="/about" className="mr-4">About</Link>
          <Link to="/contact">Contact</Link>
        </nav>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Welcome to My Blog</h2>
        <p className="mb-4">This is a place where I share my thoughts and experiences.</p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl font-bold">Latest Post</h3>
            <p className="mt-2">Check out my latest post about web development trends in 2023.</p>
          </div>
          <div className="bg-gray-100 p-4 rounded shadow">
            <h3 className="text-xl font-bold">Social Media</h3>
            <div className="flex space-x-4 mt-2">
              <a href="https://twitter.com" target="_blank" rel="noopener noreferrer">
                <Twitter className="w-6 h-6 text-blue-500" />
              </a>
              <a href="https://instagram.com" target="_blank" rel="noopener noreferrer">
                <Instagram className="w-6 h-6 text-pink-500" />
              </a>
              <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
                <Facebook className="w-6 h-6 text-blue-700" />
              </a>
            </div>
          </div>
        </div>
      </main>
      <footer className="bg-blue-600 text-white p-4 mt-4">
        <p>&copy; 2023 My Personal Blog</p>
      </footer>
    </div>
  );
};

export default HomePage;
