import React from 'react';

const AboutPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-white">
      <header className="bg-blue-600 text-white p-4">
        <h1 className="text-3xl font-bold">About Me</h1>
      </header>
      <main className="p-4">
        <h2 className="text-2xl font-semibold mb-4">Who I Am</h2>
        <p className="mb-4">I am a passionate web developer with a love for creating dynamic and engaging web applications.</p>
        <img src="https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwzNjUyOXwwfDF8c2VhcmNofDF8fHBlcnNvbnxlbnwwfHx8fDE2NzY1NzY3NzQ&ixlib=rb-1.2.1&q=80&w=400" alt="About Me" className="w-full h-auto rounded shadow" />
      </main>
      <footer className="bg-blue-600 text-white p-4 mt-4">
        <p>&copy; 2023 My Personal Blog</p>
      </footer>
    </div>
  );
};

export default AboutPage;
