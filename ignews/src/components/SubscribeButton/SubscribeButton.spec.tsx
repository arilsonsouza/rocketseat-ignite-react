import { mocked } from 'ts-jest/utils';
import { useRouter } from 'next/router';
import { signIn, useSession } from 'next-auth/client';
import { render, screen, fireEvent } from '@testing-library/react';

import { SubscribeButton } from '.';

jest.mock('next-auth/client');

jest.mock('next/router');

const useSessionMocked = mocked(useSession);

describe('SubscribeButton component', () => {
  useSessionMocked.mockReturnValueOnce([null, false]);
  it('renders correctly', () => {
    render(
      <SubscribeButton />
    );

    expect(screen.getByText('Subscribe now')).toBeInTheDocument();
  });

  it('redirects to sign in when not authenticated', () => {
    useSessionMocked.mockReturnValueOnce([null, false]);
    const signInMocked = mocked(signIn);

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(signInMocked).toHaveBeenCalled();
  });

  it('redirects to posts when user already has a subscritpion', () => {
    useSessionMocked.mockReturnValueOnce([{
      user: { name: 'John Doe', email: 'john.doe@email.com' },
      expires: 'fake-expires',
      activeSubscription: 'fake-active-subscription'
    }, false]);

    const useRouterMocked = mocked(useRouter);
    const pushMock = jest.fn();

    useRouterMocked.mockReturnValueOnce({
      push: pushMock,
    } as any)

    render(<SubscribeButton />);

    const subscribeButton = screen.getByText('Subscribe now');

    fireEvent.click(subscribeButton);

    expect(pushMock).toHaveBeenCalledWith('/posts');
  });

});
