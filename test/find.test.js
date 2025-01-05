const request = require('supertest');
const app = require('../app');

describe('POST /find', () => {
  it('should redirect to /find after successfully saving an event', async () => {
    const eventData = {
      eventName: 'Football Match',
      footballType: 'Soccer',
      location: 'Stadium',
      Fees: 10,
      date: '2024-12-31',
    };

    const response = await request(app)
      .post('/find')
      .send(eventData);

    expect(response.status).toBe(302);

    expect(response.header['location']).toBe('/find');
  });
});
