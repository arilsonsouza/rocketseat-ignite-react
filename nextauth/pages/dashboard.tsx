import type { NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { AuhtContext } from '../contexts/AuthContext';
import { api } from '../services/api';

const Dashboard: NextPage = () => {
  const { user } = useContext(AuhtContext);
  useEffect(() => {

    (async () => {
      try {
        const { data } = await api.get('/me');
        const { email, permissions, roles } = data;
      } catch (error) {
        console.log(error);
      }

    })();

  }, []);
  return (
    <div>
      <h1>Dashboard</h1>
      <p>{user?.email}</p>
    </div>
  );
}

export default Dashboard;
