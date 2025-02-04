import { ReservationStatus } from '@domain/reservation/model';
import create_server from '@interface/shared/express/server';
import request from 'supertest';

describe('Availability Router e2e Tests', () => {
  const app = create_server(3000).application;

  it('POST /reservation should create a new reservation', async () => {
    const body = {
      partySize: 6,
      customerName: 'Thrall',
      customerEmail: 'thrall@fakemail.com',
      datetime: '2025-02-01T12:00:00.000'
    };
    const res = await request(app).post('/reservation').send(body);

    expect(res.status).toBe(201);
    expect(res.body.customerName).toBe(body.customerName);
    expect(res.body['status']).toBe(ReservationStatus.RESERVED);
  });

  it('GET /reservation should get the reservation', async () => {
    const body = {
      partySize: 6,
      customerName: 'Thrall',
      customerEmail: 'thrall@fakemail.com',
      datetime: '2025-02-01T12:00:00.000'
    };
    const createRes = await request(app).post('/reservation').send(body);

    const getRes = await request(app).get(`/reservation/${createRes.body.id}`);

    expect(getRes.status).toBe(200);
    expect(getRes.body.id).toBe(createRes.body.id);
    expect(getRes.body.customerName).toBe(createRes.body.customerName);
  });

  it('PUT /reservation should update the reservation', async () => {
    const body = {
      partySize: 6,
      customerName: 'Thrall',
      customerEmail: 'thrall@fakemail.com',
      datetime: '2025-02-01T13:00:00.000'
    };
    const createRes = await request(app).post('/reservation').send(body);

    const updateBody = {
      customerName: 'Jaina'
    };
    const updateRes = await request(app).put(`/reservation/${createRes.body.id}`).send(updateBody);

    expect(updateRes.status).toBe(200);
    expect(updateRes.body.id).toBe(createRes.body.id);
    expect(updateRes.body.customerName).toBe(updateBody.customerName);
    expect(updateRes.body.status).toBe(ReservationStatus.RESERVED);
  });

  it('DELETE /reservation should update the reservation status to cancelled', async () => {
    const body = {
      partySize: 6,
      customerName: 'Thrall',
      customerEmail: 'thrall@fakemail.com',
      datetime: '2025-02-01T12:00:00.000'
    };
    const createRes = await request(app).post('/reservation').send(body);
    const deleteRes = await request(app).delete(`/reservation/${createRes.body.id}`);
    const getRes = await request(app).get(`/reservation/${createRes.body.id}`);

    expect(deleteRes.status).toBe(204);
    expect(getRes.body.id).toBe(createRes.body.id);
    expect(getRes.body.status).toBe(ReservationStatus.CANCELLED);
  });

  it('DELETE /reservation should update the wailist', async () => {
    const body = {
      partySize: 6,
      customerName: 'Thrall',
      customerEmail: 'thrall@fakemail.com',
      datetime: '2025-02-02T15:00:00.000'
    };
    const createReserved = await request(app).post('/reservation').send(body);

    const waitlistBody = {
      ...body,
      customerName: 'Jaina',
      customerEmail: 'jaina@fakemail.com',
      datetime: '2025-02-02T15:00:00.000'
    };
    const createWaitlisted = await request(app).post('/reservation').send(waitlistBody);

    const deleteRes = await request(app).delete(`/reservation/${createReserved.body.id}`);
    await request(app).get(`/reservation/${createWaitlisted.body.id}`);

    const getRes = await request(app).get(`/reservation/${createWaitlisted.body.id}`);

    expect(deleteRes.status).toBe(204);
    expect(getRes.status).toBe(200);
    expect(getRes.body.status).toBe(ReservationStatus.RESERVED);
  });
});
