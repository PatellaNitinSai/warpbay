import { useEffect, useState } from 'react';
import API from '../api';
import { useParams } from 'react-router-dom';

export default function EventDetails() {
  const { id } = useParams();
  const [event, setEvent] = useState(null);
  const [attendees, setAttendees] = useState([]);

  // fetch event and its attendees
  useEffect(() => {
    (async () => {
      try {
        const { data } = await API.get(`/events/${id}/attendees`);
        setAttendees(data);
        const resEvt = await API.get(`/events/${id}`);
        setEvent(resEvt.data);
      } catch (err) {
        console.error(err);
      }
    })();
  }, [id]);

  // register function now used in the button
  const register = async () => {
    try {
      await API.post(`/events/${id}/register`);
      // re-fetch attendees list
      const { data } = await API.get(`/events/${id}/attendees`);
      setAttendees(data);
    } catch (err) {
      console.error(err);
    }
  };

  if (!event) return <p>Loading…</p>;

  return (
    <div className="p-4 max-w-md mx-auto space-y-4">
      <h1 className="text-2xl font-bold">{event.title}</h1>
      <p className="text-sm text-gray-600">{new Date(event.date).toLocaleString()}</p>
      <p>{event.description}</p>
      <p><strong>Location:</strong> {event.location}</p>

      <button
        onClick={register}
        className="mt-4 w-full bg-blue-600 text-white p-2 rounded"
      >
        Register for this Event
      </button>

      <h2 className="text-xl font-semibold mt-6">Attendees</h2>
      {attendees.length === 0 ? (
        <p>No one has registered yet.</p>
      ) : (
        <ul className="list-disc pl-5">
          {attendees.map(u => (
            <li key={u._id}>{u.username}</li>
          ))}
        </ul>
      )}
    </div>
  );
}
