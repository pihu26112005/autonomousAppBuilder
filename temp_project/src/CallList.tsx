import React from 'react';
import { Phone } from 'lucide-react';

const calls = [
  { id: 1, name: 'Alice', time: '10:30 AM' },
  { id: 2, name: 'Bob', time: '11:00 AM' },
  { id: 3, name: 'Charlie', time: '11:30 AM' },
  { id: 4, name: 'David', time: '12:00 PM' },
  { id: 5, name: 'Eve', time: '12:30 PM' },
  { id: 6, name: 'Frank', time: '1:00 PM' },
  { id: 7, name: 'Grace', time: '1:30 PM' },
  { id: 8, name: 'Hank', time: '2:00 PM' },
  { id: 9, name: 'Ivy', time: '2:30 PM' },
  { id: 10, name: 'Jack', time: '3:00 PM' }
];

function CallList() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Calls</h1>
      <ul className="space-y-4">
        {calls.map(call => (
          <li key={call.id} className="flex items-center p-4 bg-white shadow rounded-lg">
            <Phone className="w-6 h-6 text-red-500 mr-4" />
            <div>
              <h2 className="text-lg font-semibold">{call.name}</h2>
              <p className="text-gray-600">{call.time}</p>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CallList;
