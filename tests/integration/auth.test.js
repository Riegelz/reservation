const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');

describe('Auth routes', () => {
  describe('POST /v1/auth/get-token', () => {
    let payload;
    beforeEach(() => {
      payload = {
        email: process.env.JWT_SAMPLE_EMAIL,
        password: process.env.JWT_SAMPLE_PASSWORD,
      };
    });
    test('should return 200 and and return token', async () => {
      const res = await request(app).post('/v1/auth/get-token').send(payload).expect(httpStatus.OK);
      expect(res.body).toEqual({
        token: expect.anything(),
      });
    });
    test('should return 400 error if payload is missing', async () => {
      await request(app).post('/v1/auth/get-token').send({}).expect(httpStatus.BAD_REQUEST);
    });
  });
});
