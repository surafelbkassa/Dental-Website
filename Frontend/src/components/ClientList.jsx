export default function ClientList({ clients }) {
  return (
    <table>
      <thead>
        <tr>
          <th>Name</th><th>Phone</th><th>Email</th>
        </tr>
      </thead>
      <tbody>
        {clients.map(c => (
          <tr key={c._id}>
            <td>{c.name}</td>
            <td>{c.phone}</td>
            <td>{c.email}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
