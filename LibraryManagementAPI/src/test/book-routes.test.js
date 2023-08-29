require('./setup');
const path = require('path');
const supertest = require('supertest');
const app = require('../app'); // Adjust the path as needed

// Specify the path to the custom .env file
const envPath = path.join(__dirname, '.env.test');
require('dotenv').config({ path: envPath });

const request = supertest(app);

describe('Book Routes', () => {
  it('should get all books', async () => {
    const response = await request.get('/books');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Array));
  });

  it('should get a book by code', async () => {
    const response = await request.get('/books/JK-45');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('should borrow a book', async () => {
    const response = await request.post('/books/64ecfe26a4e578577a3a8ad2/borrow/64ecfe26a4e578577a3a8ad8');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });

  it('should return a book', async () => {
    const response = await request.post('/books/64ecfe26a4e578577a3a8ad2/return');
    expect(response.status).toBe(200);
    expect(response.body).toEqual(expect.any(Object));
  });
});
