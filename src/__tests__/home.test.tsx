import { afterAll, afterEach, beforeAll, describe, expect, it } from 'vitest';
import {
  render,
  screen,
  waitFor,
  fireEvent,
  cleanup,
} from '@testing-library/react';
import { http, HttpResponse } from 'msw';
import { config } from '../config/config.ts';
import { setupServer } from 'msw/node';
import App from '../App.tsx';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
const queryClient = new QueryClient();
const server = setupServer(
  http.get(`${config.API_URL}/questions`, (req) => {
    return HttpResponse.json([
      {
        question: 'What is 2 + 2?',
        options: ['3', '4', '5', '6'],
        selectedAnswer: null,
      },
      {
        question: 'What is 3 + 3?',
        options: ['3', '4', '5', '6'],
        selectedAnswer: null,
      },
    ]);
  }),
  http.post(`${config.API_URL}/questions`, (req) => {
    return HttpResponse.json([{ correctAnswer: '4' }, { correctAnswer: '6' }]);
  })
);

beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => {
  cleanup();
  queryClient.clear();
  server.resetHandlers();
});

describe('App Component', () => {
  const renderApp = () =>
    render(
      <QueryClientProvider client={queryClient}>
        <App />
      </QueryClientProvider>
    );

  it('should display the loading text', () => {
    renderApp();
    expect(screen.getByText('Loading Questions ...')).toBeInTheDocument();
  });

  it('should display a question and its options after loading', async () => {
    renderApp();
    await waitFor(() => screen.getByText('What is 2 + 2?'));

    expect(screen.getByText('What is 2 + 2?')).toBeInTheDocument();
    expect(screen.getByLabelText('3')).toBeInTheDocument();
    expect(screen.getByLabelText('4')).toBeInTheDocument();
  });

  it('should navigate to the next question', async () => {
    renderApp();
    await waitFor(() => screen.getByText('What is 2 + 2?'));
    fireEvent.click(screen.getByLabelText('4'));
    await waitFor(() => {
      expect(screen.getByLabelText('4')).toBeChecked();
    });
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));
    expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
  });

  it('should submit the questions and display the score', async () => {
    renderApp();
    await waitFor(() => screen.getByText('What is 2 + 2?'));
    fireEvent.click(screen.getByLabelText('4'));
    await waitFor(() => {
      expect(screen.getByLabelText('4')).toBeChecked();
    });
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));
    await waitFor(() => {
      expect(screen.getByText('What is 3 + 3?')).toBeInTheDocument();
    });

    fireEvent.click(screen.getByLabelText('6'));
    await waitFor(() => {
      expect(screen.getByLabelText('6')).toBeChecked();
    });
    fireEvent.click(
      screen.getByRole('button', {
        name: /Submit Questions/i,
      })
    );
    await waitFor(() => screen.getByText('What is 2 + 2?'));
    fireEvent.click(screen.getByRole('button', { name: /Next Question/i }));
    await waitFor(() => {
      expect(screen.getByText(/You scored:/i)).toBeInTheDocument();
    });
  });

  // it("should display an error message when the fetch fails", async () => {
  //   server.use(
  //     http.get(`${config.API_URL}/questions`, (req) => {
  //       return HttpResponse.error();
  //     })
  //   );

  //   renderApp();
  //   await waitFor(() =>
  //     expect(screen.getByText(/An error has occurred:/)).toBeInTheDocument()
  //   );
  // });
});
