import { FiX } from 'react-icons/fi';
import { FaGithub } from 'react-icons/fa';

import styles from './styles.module.scss';

export function SignInButton() {
  const isUserLoggedIn = false;

  return isUserLoggedIn ? (
    <button
      className={styles.signInButton}
      type='button'
    >
      <FaGithub color='#04D361' />
      Arilson Souza
      <FiX color='#737380' className={styles.closeIcon} />
    </button>

  ) : (
    <button
      className={styles.signInButton}
      type='button'
    >
      <FaGithub color='#EBA417' />
      Sign in with Github
    </button>
  )
}