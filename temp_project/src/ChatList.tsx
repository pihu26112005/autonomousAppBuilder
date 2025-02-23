import React from 'react';
import { MessageCircle } from 'lucide-react';

const chats = [
  { id: 1, name: 'Alice', lastMessage: 'Hey, how are you?' },
  { id: 2, name: 'Bob', lastMessage: 'Are we meeting tomorrow?' },
  { id: 3, name: 'Charlie', lastMessage: 'Let’s catch up soon!' },
  { id: 4, name: 'David', lastMessage: 'Got it, thanks!' },
  { id: 5, name: 'Eve', lastMessage: 'See you later!' },
  { id: 6, name: 'Frank', lastMessage: 'What’s up?' },
  { id: 7, name: 'Grace', lastMessage: 'Can you send the files?' },
  { id: 8, name: 'Hank', lastMessage: 'I’ll call you back.' },
  { id: 9, name: 'Ivy', lastMessage: 'Let’s do lunch.' },
  { id: 10, name: 'Jack', lastMessage: 'Good night!' }
];

function ChatList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Chats</h1>
      <ul className="space-y-4">
        {chats.map(chat => (
          <li key={chat.id} className="flex items-center p-4 bg-white shadow rounded-lg">
            <MessageCircle className="w-6 h-6 text-blue-500 mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{chat.name}</h2>
              <p className="text-gray-600">{chat.lastMessage}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ChatList;
