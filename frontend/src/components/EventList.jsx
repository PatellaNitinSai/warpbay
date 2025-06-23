// src/components/EventList.jsx
import { useEffect, useState } from 'react';
import API from '../api';
import { Link, useNavigate } from 'react-router-dom';

export default function EventList() {
  const [events, setEvents] = useState([]);
  const nav = useNavigate();

  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get('/events');
        setEvents(data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  return (
    <div className="p-4 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Upcoming Events</h1>
      <button
        onClick={() => nav('/events/new')}
        className="mb-4 bg-blue-600 text-white px-4 py-2 rounded"
      >
        + Create Event
      </button>
      {events.length === 0 ? (
        <p>No upcoming events.</p>
      ) : (
        <ul className="space-y-4">
          {events.map(evt => (
            <li key={evt._id} className="border p-4 rounded hover:shadow">
              <Link to={`/events/${evt._id}`} className="block">
                <h2 className="text-xl font-semibold">{evt.title}</h2>
                <p className="text-sm text-gray-600">
                  {new Date(evt.date).toLocaleString()}
                </p>
                <p className="mt-2">{evt.description}</p>
              </Link>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
