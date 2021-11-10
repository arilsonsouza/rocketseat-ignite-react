import type { NextPage } from 'next';
import { useContext } from 'react';
import { AuhtContext } from '../contexts/AuthContext';

const Dashboard: NextPage = () => {
  const { user } = useContext(AuhtContext);

  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export default Dashboard;
