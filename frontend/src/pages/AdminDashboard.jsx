import { useEffect, useState } from 'react';
import toast from 'react-hot-toast';

import Navbar from '../components/Navbar';
import api from '../services/api';

import '../styles/admin.css';

const AdminDashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedUser, setSelectedUser] = useState(null);

  const fetchUsers = async () => {
    try {
      const response = await api.get('/admin/users');
      setUsers(response.data.data);
    } catch (error) {
      toast.error(error.response?.data?.message || 'Failed to fetch users');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/admin/users/${id}`);

      setUsers((prev) => prev.filter((user) => user._id !== id));

      toast.success('User deleted successfully');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Delete failed');
    }
  };

  return (
    <>
      <Navbar />

      <div className='admin-container'>
        <div className='admin-card'>
          <h1>Admin Dashboard</h1>

          {loading ? (
            <p>Loading users...</p>
          ) : (
            <div className='admin-table-container'>
              <table className='admin-table'>
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Actions</th>
                  </tr>
                </thead>

                <tbody>
                  {users.map((user) => (
                    <tr key={user._id}>
                      <td>{user.name}</td>
                      <td>{user.email}</td>
                      <td>{user.role}</td>
                      <td>
                        <button
                          className='view-btn'
                          onClick={() => setSelectedUser(user)}
                        >
                          View
                        </button>

                        <button
                          className='delete-btn'
                          onClick={() => handleDelete(user._id)}
                        >
                          Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      {selectedUser && (
        <div className='modal-overlay' onClick={() => setSelectedUser(null)}>
          <div className='modal' onClick={(e) => e.stopPropagation()}>
            <h2>User Details</h2>

            <p>
              <strong>Name:</strong> {selectedUser.name}
            </p>

            <p>
              <strong>Email:</strong> {selectedUser.email}
            </p>

            <p>
              <strong>Role:</strong> {selectedUser.role}
            </p>

            <p>
              <strong>ID:</strong> {selectedUser._id}
            </p>

            <button className='close-btn' onClick={() => setSelectedUser(null)}>
              Close
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default AdminDashboard;
