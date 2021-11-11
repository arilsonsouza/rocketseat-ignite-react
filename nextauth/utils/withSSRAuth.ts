import { destroyCookie, parseCookies } from 'nookies';
import { GetServerSideProps, GetServerSidePropsContext } from 'next';
import { AuthTokenError } from '../services/errors/AuthTokenError';

export function withSSRAuth(fn: GetServerSideProps) {
  return async (ctx: GetServerSidePropsContext) => {
    const cookies = parseCookies(ctx);
    if (!cookies['nextauth.token']) {
      return {
        redirect: {
          destination: '/',
          permanent: false,
        }
      }
    }
    try {
      return await fn(ctx);
    } catch (error) {
      if (error instanceof AuthTokenError) {
        destroyCookie(ctx, 'nextauth.token');
        destroyCookie(ctx, 'nextauth.refreshToken');
        return {
          redirect: {
            destination: '/',
            permanent: false,
          }
        }
      }
    }

  }
}