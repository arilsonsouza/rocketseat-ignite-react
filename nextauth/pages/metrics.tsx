import type { GetServerSideProps, NextPage } from 'next';

import { setupApiclient } from '../services/api';
import { withSSRAuth } from '../utils/withSSRAuth';

const Dashboard: NextPage = () => {
  return (
    <div>
      <h1>Metrics</h1>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRAuth(async (ctx) => {
  const apiClient = setupApiclient(ctx);

  const response = await apiClient.get('/me');

  return {
    props: {}
  };
}, {
  permissions: ['metrics.list'],
  roles: ['administrator']
});


export default Dashboard;
