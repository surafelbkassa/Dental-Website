import { useState } from 'react';
import api from '../api';

export default function ClientForm({ onAdd }) {
  const [client, setClient] = useState({ name: '', phone: '', email: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await api.post('/clients', client);
      onAdd(res.data);
      setClient({ name: '', phone: '', email: '' });
    } catch (err) {
      alert('Failed to add client');
    }
  };

  return (
    <form onSubmit={handleSubmit} className="mb-4 d-flex gap-2 flex-wrap justify-content-center">
      <input
        className="form-control"
        value={client.name}
        onChange={e => setClient({ ...client, name: e.target.value })}
        placeholder="Name"
        required
      />
      <input
        className="form-control"
        value={client.phone}
        onChange={e => setClient({ ...client, phone: e.target.value })}
        placeholder="Phone"
      />
      <input
        className="form-control"
        value={client.email}
        onChange={e => setClient({ ...client, email: e.target.value })}
        placeholder="Email"
      />
      <button type="submit" className="btn btn-primary">Add Client</button>
    </form>
  );
}
