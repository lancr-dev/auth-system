import Navbar from '../components/Navbar';

import useAuth from '../hooks/useAuth';

import '../styles/dashboard.css';

const Dashboard = () => {
  const { user } = useAuth();

  return (
    <>
      <Navbar />

      <div className='dashboard'>
        <div className='dashboard-card'>
          <h1>Welcome back, {user?.name}</h1>

          <div className='dashboard-info'>
            <p>
              <strong>Name:</strong> {user?.name}
            </p>

            <p>
              <strong>Email:</strong> {user?.email}
            </p>

            <p>
              <strong>Role:</strong> {user?.role}
            </p>
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;
