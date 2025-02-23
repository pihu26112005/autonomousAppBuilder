import React from 'react';
import { User } from 'lucide-react';

const users = [
  { id: 1, name: 'Alice' },
  { id: 2, name: 'Bob' },
  { id: 3, name: 'Charlie' },
  { id: 4, name: 'David' },
  { id: 5, name: 'Eve' },
  { id: 6, name: 'Frank' },
  { id: 7, name: 'Grace' },
  { id: 8, name: 'Hank' },
  { id: 9, name: 'Ivy' },
  { id: 10, name: 'Jack' }
];

function UserList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">New Users</h1>
      <ul className="space-y-4">
        {users.map(user => (
          <li key={user.id} className="flex items-center p-4 bg-white shadow rounded-lg">
            <User className="w-6 h-6 text-green-500 mr-4" />
            <h2 className="text-lg font-semibold">{user.name}</h2>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default UserList;
