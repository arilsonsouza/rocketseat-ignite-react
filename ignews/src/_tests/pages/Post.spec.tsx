import { mocked } from 'ts-jest/utils';
import { render, screen } from '@testing-library/react';

import Post, { getServerSideProps } from '../../pages/posts/[slug]';

import { getPrismicClient } from '../../services/prismic';
import { getSession } from 'next-auth/client';

jest.mock('../../services/prismic');
jest.mock('next-auth/client');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: 'Post content',
  updatedAt: 'March, 10',
};

const getSessionMocked = mocked(getSession);

describe('Post page', () => {
  it('renders correctly', () => {
    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Post content')).toBeInTheDocument();
  });

  it('redirect user if no subscritpion is found', async () => {
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: null
    });

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: '/',
          permanent: false
        }
      })
    );
  });

  it('loads initial data', async () => {
    getSessionMocked.mockResolvedValueOnce({
      activeSubscription: 'fake-active-subscription'
    });

    const getPrismicClientMocked = mocked(getPrismicClient);
    getPrismicClientMocked.mockReturnValueOnce({
      getByUID: jest.fn().mockResolvedValueOnce({
        data: {
          title: [
            { type: 'heading', text: 'My new post' }
          ],
          content: [
            { type: 'paragraph', text: 'My new post content' }
          ],
        },
        last_publication_date: '04-01-2021'
      })
    } as any);

    const response = await getServerSideProps({
      req: {
        cookies: {}
      },
      params: { slug: 'my-new-post' },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            content: "<p>My new post content</p>",
            slug: "my-new-post",
            title: "My new post",
            updatedAt: "01 de abril de 2021"
          }
        }
      })
    );
  });
});