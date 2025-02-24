import React, { useState } from 'react';
import RestaurantModal from './RestaurantModal';
import ChatPage from './ChatPage';
import CommunityPage from './CommunityPage';

function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [restaurants, setRestaurants] = useState([
    { id: 1, name: 'The Italian Bistro', description: 'Authentic Italian cuisine with a modern twist.' },
    { id: 2, name: 'Sushi World', description: 'Fresh sushi and sashimi made to order.' },
    { id: 3, name: 'Steakhouse', description: 'Premium steaks cooked to perfection.' },
    { id: 4, name: 'Pizza Palace', description: 'Delicious pizzas with a variety of toppings.' },
    { id: 5, name: 'Cafe Delight', description: 'Cozy cafe with a selection of pastries and coffee.' },
  ]);

  const handleCreateRestaurant = (name: string, description: string) => {
    const newRestaurant = { id: restaurants.length + 1, name, description };
    setRestaurants([...restaurants, newRestaurant]);
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-500 p-4">
      <h1 className="text-3xl font-bold text-white mb-4">Restaurant Reservation & Ordering</h1>
      <button
        onClick={() => setIsModalOpen(true)}
        className="bg-white text-blue-500 p-2 rounded-lg shadow-md hover:bg-gray-100 mb-4"
      >
        Create Restaurant
      </button>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {restaurants.map((restaurant) => (
          <div key={restaurant.id} className="bg-white p-4 rounded-lg shadow-md">
            <h2 className="text-xl font-semibold mb-2">{restaurant.name}</h2>
            <p className="text-gray-700">{restaurant.description}</p>
          </div>
        ))}
      </div>
      <RestaurantModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreateRestaurant}
      />
      <ChatPage />
      <CommunityPage />
    </div>
  );
}

export default App;
