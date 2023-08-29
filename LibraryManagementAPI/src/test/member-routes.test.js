require('./setup');
const supertest = require('supertest');
const app = require('../app'); // Assuming you have your app defined in app.js

const request = supertest(app);


describe('Member Routes', () => {
  it('should get all members', async () => {
    const response = await request.get('/members');
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should get a member by code', async () => {
    const response = await request.get(`/members/M001`);
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  it('should penalize a member', async () => {
    const memberId = '64ecfe26a4e578577a3a8ad9';
    const response = await request.post(`/members/${memberId}/penalize`)
      .send({ penalizedUntil: '2023-12-31' }); // Adjust the date format as needed
    expect(response.status).toBe(200);
    // Add more assertions as needed
  });

  // Add more test cases for other routes as needed
});
