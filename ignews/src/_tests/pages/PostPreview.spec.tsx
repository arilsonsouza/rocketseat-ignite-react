import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';
import { useSession } from 'next-auth/client';
import { render, screen } from '@testing-library/react';

import Post, { getStaticProps } from '../../pages/posts/preview/[slug]';

import { getPrismicClient } from '../../services/prismic';

jest.mock('next/router');
jest.mock('next-auth/client');
jest.mock('../../services/prismic');

const post = {
  slug: 'my-new-post',
  title: 'My new post',
  content: 'Post content',
  updatedAt: 'March, 10',
};

const useSessionMocked = mocked(useSession);
const useRouterMocked = mocked(useRouter);
const pushMock = jest.fn();

describe('Post Preview page', () => {
  it('renders correctly', () => {
    useSessionMocked.mockReturnValueOnce([null, false]);
    render(<Post post={post} />);

    expect(screen.getByText('My new post')).toBeInTheDocument();
    expect(screen.getByText('Wanna continue reading?')).toBeInTheDocument();
  });

  it('redirect user to full post when user is subscribed', async () => {
    useSessionMocked.mockReturnValueOnce([{
      activeSubscription: 'fake-active-subscription'
    }, false]);

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<Post post={post} />);

    expect(pushMock).toHaveBeenCalledWith('/posts/my-new-post');

  });

  it('loads initial data', async () => {
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

    const response = await getStaticProps({
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