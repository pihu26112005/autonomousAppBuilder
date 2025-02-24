import React from 'react';

const CommunityPage: React.FC = () => {
  const blogs = [
    { id: 1, title: 'Amazing Experience at The Italian Bistro', content: 'The food was absolutely delicious and the ambiance was perfect for a romantic dinner.', author: 'John Doe' },
    { id: 2, title: 'Great Service at Sushi World', content: 'The staff was very friendly and the sushi was fresh and tasty.', author: 'Jane Smith' },
    { id: 3, title: 'A Night to Remember at Steakhouse', content: 'The steak was cooked to perfection and the wine selection was excellent.', author: 'Mike Johnson' },
    { id: 4, title: 'Family Dinner at Pizza Palace', content: 'The kids loved the pizza and the service was quick and efficient.', author: 'Emily Davis' },
    { id: 5, title: 'Brunch at Cafe Delight', content: 'The pancakes were fluffy and the coffee was strong and flavorful.', author: 'Sarah Brown' },
  ];

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Community Blogs</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map((blog) => (
          <div key={blog.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{blog.title}</h2>
            <p className="text-gray-700 mb-2">{blog.content}</p>
            <p className="text-gray-500 text-sm">- {blog.author}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CommunityPage;
