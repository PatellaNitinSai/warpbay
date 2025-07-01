// src/components/Login.jsx
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import API from '../api';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error,    setError]    = useState('');
  const nav = useNavigate();

  const submit = async e => {
    e.preventDefault();
    setError('');
    try {
      const { data } = await API.post('/auth/login', {
        username: username.trim(),
        password
      });
      localStorage.setItem('token', data.token);
      nav('/events', { replace: true });
    } catch (err) {
      setError(err.response?.data?.error || 'Login failed');
    }
  };

  return (
    <form onSubmit={submit} className="p-4 max-w-sm mx-auto">
      <h1 className="text-xl mb-4">Login</h1>
      {error && <p className="text-red-500 mb-2">{error}</p>}
      <input
        value={username}
        onChange={e => setUsername(e.target.value)}
        placeholder="Username"
        className="w-full p-2 border mb-2"
        required
      />
      <input
        type="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
        placeholder="Password"
        className="w-full p-2 border mb-2"
        required
      />
      <button type="submit" className="bg-blue-500 text-white p-2 w-full rounded">
        Login
      </button>
    </form>
  );
}
