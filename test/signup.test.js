const request = require('supertest');
const app = require('../app'); 
const User = require('../models/userModel');

describe('POST /signup', () => {
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a new user and redirect to login', async () => {
    const userData = {
      email: 'test@example.com',
      fullname: 'John Doe',
      username: 'john_doe',
      password: 'password123',
    };

    const response = await request(app)
      .post('/signup')
      .send(userData)
      .expect(302); 

    expect(response.header.location).toBe('/login');

    const savedUser = await User.findOne({ email: userData.email });
    expect(savedUser).toBeTruthy();
    expect(savedUser.username).toBe(userData.username);
  });

  it('should handle validation errors', async () => {

    const invalidUserData = {
      email: 'invalid-email',
      fullname: 'Short', 
      username: 'to',
      password: 'short',
    };

    const response = await request(app)
      .post('/signup')
      .send(invalidUserData)
      .expect(302); 

    expect(response.header.location).toBe('/signup');

    expect(response.header['set-cookie']).toBeTruthy();
    expect(response.header['set-cookie'][0]).toContain('error=');
  });
});
