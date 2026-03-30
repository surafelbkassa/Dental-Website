import { useEffect, useState } from 'react';
import axios from 'axios';
import { Modal, Button, Form } from 'react-bootstrap';

function Dashboard() {
  const [clients, setClients] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [editingClient, setEditingClient] = useState(null);
  const [newClient, setNewClient] = useState({ name: '', phone: '', totalBill: '', nextVisit: '' });
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    fetchClients();
  }, []);

  const fetchClients = () => {
    axios.get('http://localhost:5000/api/clients')
      .then(res => setClients(res.data))
      .catch(err => showToast("Failed to load clients"));
  };

  const showToast = (msg) => {
    setToastMsg(msg);
    setTimeout(() => setToastMsg(''), 3000);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/clients/${id}`);
      setClients(clients.filter(client => client._id !== id));
      showToast("Client deleted.");
    } catch (err) {
      showToast("❌ Failed to delete client.");
    }
  };

  const handleEdit = (client) => {
    setEditingClient({ ...client });
    setShowModal(true);
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/clients/${editingClient._id}`, editingClient);
      setClients(clients.map(c => c._id === editingClient._id ? editingClient : c));
      setShowModal(false);
      showToast("Client updated!");
    } catch (err) {
      showToast("❌ Failed to update client.");
    }
  };

  const handleNewClient = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`http://localhost:5000/api/clients`, newClient);
      setClients([...clients, res.data]);
      setNewClient({ name: '', phone: '', totalBill: '', nextVisit: '' });
      showToast("✅ New client added!");
    } catch {
      showToast("❌ Failed to add client.");
    }
  };

  const handleAddPayment = async (clientId) => {
    const amount = prompt("Enter payment amount:");

    if (!amount || isNaN(amount)) return;

    try {
      await axios.post(`http://localhost:5000/api/clients/${clientId}/payments`, {
        amount: Number(amount)
      });

      fetchClients(); // refresh data
      showToast("Payment added!");
    } catch {
      showToast("❌ Failed to add payment");
    }
  };

  return (
    <div className="container py-4">
      <h1 className="text-center mb-4">🦷 Dental Client Tracker</h1>

      {/* Add Client Form */}
      <Form className="mb-4" onSubmit={handleNewClient}>
        <div className="row g-2">
          <div className="col-md">
            <Form.Control placeholder="Name" value={newClient.name} onChange={e => setNewClient({ ...newClient, name: e.target.value })} required />
          </div>
          <div className="col-md">
            <Form.Control placeholder="Phone" value={newClient.phone} onChange={e => setNewClient({ ...newClient, phone: e.target.value })} required />
          </div>
          <div className="col-md">
            <Form.Control placeholder="Total_bill" type="number" value={newClient.totalBill} onChange={e => setNewClient({ ...newClient, totalBill: e.target.value })} />
          </div>
          <div className="col-md">
            <Form.Control type="date" value={newClient.nextVisit} onChange={e => setNewClient({ ...newClient, nextVisit: e.target.value })} />
          </div>
          <div className="col-md-auto">
            <Button type="submit" variant="success">➕ Add</Button>
          </div>
        </div>
      </Form>

      {/* Table */}
      <div className="table-responsive">
        <table className="table table-striped table-hover shadow-sm">
          <thead className="table-light">
            <tr>
              <th>Name</th>
              <th>Phone</th>
              <th>Total Bill</th>
              <th>Paid</th>
              <th>Remaining</th>
              <th>Next Visit</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {clients.map(client => (
              <tr key={client._id}>
                <td>{client.name}</td>
                <td>{client.phone}</td>
                <td>${client.totalBill ?? 0}</td>
                <td className="text-success">${client.totalPaid ?? 0}</td>
                <td className="text-danger">${client.remaining ?? 0}</td>
                <td>{client.nextVisit ? new Date(client.nextVisit).toLocaleDateString() : 'N/A'}</td>
                <td>
                  <td>
                    <Button variant="link" size="sm" onClick={() => handleEdit(client)}>✏️</Button>
                    <Button variant="link" size="sm" onClick={() => handleDelete(client._id)}>🗑️</Button>
                    <Button variant="link" size="sm" onClick={() => handleAddPayment(client._id)}>💰</Button>
                  </td>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Edit Modal */}
      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Client</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-2">
              <Form.Label>Name</Form.Label>
              <Form.Control value={editingClient?.name || ''} onChange={e => setEditingClient({ ...editingClient, name: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>Phone</Form.Label>
              <Form.Control value={editingClient?.phone || ''} onChange={e => setEditingClient({ ...editingClient, phone: e.target.value })} />
            </Form.Group>
            <Form.Group className="mb-2">
              <Form.Label>totalBill </Form.Label>
              <Form.Control type="number" value={editingClient?.totalBill || ''} onChange={e => setEditingClient({ ...editingClient, totalBill: e.target.value })} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Next Visit</Form.Label>
              <Form.Control type="date" value={editingClient?.nextVisit?.slice(0,10) || ''} onChange={e => setEditingClient({ ...editingClient, nextVisit: e.target.value })} />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>Cancel</Button>
          <Button variant="primary" onClick={handleUpdate}>Save Changes</Button>
        </Modal.Footer>
      </Modal>

      {/* Toast */}
      {toastMsg && (
        <div className="toast-container position-fixed bottom-0 end-0 p-3">
          <div className="toast show bg-dark text-white" role="alert">
            <div className="toast-body">{toastMsg}</div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
