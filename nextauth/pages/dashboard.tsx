import type { GetServerSideProps, NextPage } from 'next';
import { useContext, useEffect } from 'react';
import { AuhtContext } from '../contexts/AuthContext';
import { useCan } from '../hooks/useCan';
import { setupApiclient } from '../services/api';
import { api } from '../services/apiClient';
import { withSSRAuth } from '../utils/withSSRAuth';

const Dashboard: NextPage = () => {
  const { user } = useContext(AuhtContext);
  const userCanSeeMetrics = useCan({ permissions: ['metrics.list'] });

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

      {userCanSeeMetrics && <div>
        Métricas
      </div>}
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiclient(ctx);

  const response = await apiClient.get('/me');

  return {
    props: {}
  };
});


export default Dashboard;
