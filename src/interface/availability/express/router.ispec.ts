import create_server from '@interface/shared/express/server';
import request from 'supertest';

describe('Availability Router e2e Tests', () => {
  const app = create_server(3000).application;

  it('GET /availabilty should return a whole list of available dates', async () => {
    const res = await request(app).get('/availability?datetime=2025-02-01&partySize=4');

    expect(res.status).toBe(200);
    expect(res.body[0]).toBe(new Date('2025-02-01T12:00:00').toLocaleString());
    expect(res.body[res.body.length - 1]).toBe(new Date('2025-02-01T21:45:00').toLocaleString());
  });

  it('GET /availabilty should return a empty list of available dates due to the party size', async () => {
    const res = await request(app).get('/availability?datetime=2025-02-01&partySize=8');

    expect(res.status).toBe(200);
    expect(res.body).toStrictEqual([]);
  });

  it('GET /availabilty should return a the list showing a gap', async () => {
    await request(app).post('/reservation').send({
      partySize: 6,
      customerName: 'Javier',
      customerEmail: 'javiersg1612@gmail.com',
      datetime: '2025-02-01T12:00:00.000'
    });

    const res = await request(app).get('/availability?datetime=2025-02-01&partySize=6');

    expect(res.status).toBe(200);
    expect(res.body[0]).toBe(new Date('2025-02-01T12:45:00').toLocaleString());
  });
});
