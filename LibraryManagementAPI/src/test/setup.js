require('dotenv').config({ path: '../../.env' });
const mongoose = require('mongoose');
const app = require('../app'); // Adjust the path as needed

// Connect to the test database before running tests
beforeAll(async () => {
  await mongoose.connect('mongodb://localhost/library_management', {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

// Close the MongoDB connection after all tests are done
afterAll(async () => {
  await mongoose.connection.close();
});
