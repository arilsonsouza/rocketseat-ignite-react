import type { GetServerSideProps, NextPage } from 'next';
import { FormEvent, useContext, useState } from 'react';
import { AuhtContext } from '../contexts/AuthContext';
import styles from '../styles/Home.module.css';
import { withSSRGuest } from '../utils/withSSRGuest';

const Home: NextPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const { signIn } = useContext(AuhtContext);

  async function handleSubmit(evt: FormEvent) {
    evt.preventDefault();
    const data = {
      email,
      password
    };

    await signIn(data);
  }

  return (
    <div className={styles.container}>
      <main className={styles.main}>
        <form onSubmit={handleSubmit} className={styles.form}>
          <input
            type="email"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />

          <input
            type="password"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />

          <button type="submit">
            Entrar
          </button>
        </form>
      </main>
    </div>
  );
}

export const getServerSideProps: GetServerSideProps = withSSRGuest(async (ctx) => {
  return {
    props: {}
  };
});

export default Home;
