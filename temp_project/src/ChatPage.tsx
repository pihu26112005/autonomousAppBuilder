import React, { useState } from 'react';

const ChatPage: React.FC = () => {
  const [messages, setMessages] = useState([
    { id: 1, text: 'Hello, I would like to book a table for two.', sender: 'user' },
    { id: 2, text: 'Sure, what time would you like to book?', sender: 'owner' },
    { id: 3, text: '7 PM, please.', sender: 'user' },
    { id: 4, text: 'Your table is booked for 7 PM.', sender: 'owner' },
  ]);
  const [newMessage, setNewMessage] = useState('');

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      setMessages([...messages, { id: messages.length + 1, text: newMessage, sender: 'user' }]);
      setNewMessage('');
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chat with Restaurant Owner</h1>
      <div className="bg-gray-100 p-4 rounded-lg shadow-md mb-4">
        {messages.map((message) => (
          <div key={message.id} className={`mb-2 ${message.sender === 'user' ? 'text-right' : 'text-left'}`}>
            <span className={`inline-block p-2 rounded-lg ${message.sender === 'user' ? 'bg-blue-500 text-white' : 'bg-gray-300'}`}>{message.text}</span>
          </div>
        ))}
      </div>
      <div className="flex">
        <input
          type="text"
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-grow p-2 border rounded-l-lg"
          placeholder="Type your message..."
        />
        <button
          onClick={handleSendMessage}
          className="bg-blue-500 text-white p-2 rounded-r-lg hover:bg-blue-600"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
