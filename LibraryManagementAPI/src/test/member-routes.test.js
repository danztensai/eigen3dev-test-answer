require('./setup');
const supertest = require('supertest');
const app = require('../app');

const request = supertest(app);


describe('Member Routes', () => {
  it('should get all members', async () => {
    const response = await request.get('/members');
    expect(response.status).toBe(200);

  });

  it('should get a member by code', async () => {
    const response = await request.get(`/members/M001`);
    expect(response.status).toBe(200);

  });

  it('should penalize a member', async () => {
    const memberId = '64ecfe26a4e578577a3a8ad9';
    const response = await request.post(`/members/${memberId}/penalize`)
      .send({ penalizedUntil: '2023-12-31' });
    expect(response.status).toBe(200);

  });
});
