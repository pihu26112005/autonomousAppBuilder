import React from 'react';

const ContactPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">Contact Me</h1>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Get in Touch</h2>
        <form className="bg-gray-100 p-4 rounded shadow">
          <div className="mb-4">
            <label className="block text-gray-700">Name</label>
            <input type="text" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Email</label>
            <input type="email" className="w-full p-2 border border-gray-300 rounded" />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700">Message</label>
            <textarea className="w-full p-2 border border-gray-300 rounded"></textarea>
          </div>
          <button type="submit" className="bg-blue-600 text-white p-2 rounded">Send</button>
        </form>
      </main>
      <footer className="bg-blue-600 text-white p-4 mt-4">
        <p>&copy; 2023 My Personal Blog</p>
      </footer>
    </div>
  );
};

export default ContactPage;
