import { http, delay, HttpResponse } from 'msw';
import { questions, answers } from '../db/response';
import { data } from '../db/data';

export const handlers = [
  http.get('/questions', async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    await delay(1000);
    if (type === 'network_error') {
      return HttpResponse.error();
    } else {
      return HttpResponse.json(questions);
    }
  }),

  http.get('/data', async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    await delay(1000);
    return HttpResponse.json(data);
  }),

  http.post('questions', async ({ request }) => {
    const url = new URL(request.url);
    const type = url.searchParams.get('type');
    await delay(1000);
    if (type === 'network_error') {
      return HttpResponse.error();
    } else {
      return HttpResponse.json(answers);
    }
  }),
];
