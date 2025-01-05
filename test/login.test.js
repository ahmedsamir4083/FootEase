const request = require('supertest');
const app = require('../app');
const mongoose = require('mongoose');

describe('POST /login', () => {
  it('should redirect to "/userhome" after successful login', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'ahmed',
        password: 'ahmed123',
      });

    expect(response.statusCode).toBe(302);
    expect(response.header.location).toBe('/userhome/65c604b73efbdd3651c965be');
  });

  it('should redirect to "/login" after unsuccessful login', async () => {
    const response = await request(app)
      .post('/login')
      .send({
        username: 'sdasdasd',
        password: 'asdasdasd',
      });

    expect(response.statusCode).toBe(401);
    expect(response.header.location).toBe('/login'); 
  });

  afterAll(async () => {
   
    await mongoose.disconnect();
  });
});
