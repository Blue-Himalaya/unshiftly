const app = require('../server/index.js');
const supertest = require('supertest');
const request = supertest(app);

describe('Test endpoints', () => {
  it('Should return from test endpoint', async done => {
    const response = await request.get('/schedule');
    expect(Array.isArray(response.body)).toBe(true);
    expect(response.status).toBe(200);
    done();
  });
});