import { HashRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import EventList from './components/EventList';
import EventForm from './components/EventForm';
import EventDetails from './components/EventDetails';

function App() {
  const token = localStorage.getItem('token');

  return (
    <Router>
      <Routes>
        {/* Default: if logged in → create form; else → register */}
        <Route
          path="/"
          element={
            token
              ? <Navigate to="#/events/new" replace />
              : <Navigate to="/register" replace />
          }
        />

        {/* Auth */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        {/* After auth */}
        <Route
          path="/events"
          element={token ? <EventList /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/events/new"
          element={token ? <EventForm /> : <Navigate to="/login" replace />}
        />
        <Route
          path="/events/:id"
          element={token ? <EventDetails /> : <Navigate to="/login" replace />}
        />

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
