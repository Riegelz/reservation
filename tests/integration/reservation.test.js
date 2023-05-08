const request = require('supertest');
const httpStatus = require('http-status');
const app = require('../../src/app');
const initTable = require('../../src/middlewares/reservation');

let bookingID;

describe('Reservation routes', () => {
  describe('POST /v1/reservation/change-init-reservation', () => {
    let successPayload;
    let failPayload;
    let server;
    beforeAll(() => {
      server = app.listen(3000, async () => {
        await initTable.initTable(10);
      });
      successPayload = {
        init_table: 10,
      };
      failPayload = {
        init_table: 5,
      };
    });
    afterAll(() => {
      return new Promise((done) => {
        server.close(done);
      });
    });
    test('should return 201 and return table init', async () => {
      const res = await request(app)
        .post('/v1/reservation/change-init-reservation')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(successPayload)
        .expect(httpStatus.CREATED);
      expect(Array.isArray(res.body)).toBe(true);
    });
    test('should return 400 error if payload is missing', async () => {
      await request(app)
        .post('/v1/reservation/change-init-reservation')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(failPayload)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('GET /v1/reservation/get-reservation-info', () => {
    test('should return 200 and return array of tables_info', async () => {
      const res = await request(app)
        .get('/v1/reservation/get-reservation-info')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .expect(httpStatus.OK);
      expect(Array.isArray(res.body.table_info)).toBe(true);
    });
  });
  describe('POST /v1/eservation/reserv-table', () => {
    let successPayload;
    let failPayload;
    beforeAll(() => {
      successPayload = {
        number_customer: 4,
      };
      failPayload = {
        number_customer: 100,
      };
    });
    test('should return 200 and return array of tables_info that contain with reservation_info and remain', async () => {
      const res = await request(app)
        .post('/v1/reservation/reserv-table')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(successPayload)
        .expect(httpStatus.OK);
      bookingID = res.body.table_info.reservation_info[0].table_booking_id;
      expect(Array.isArray(res.body.table_info.reservation_info)).toBe(true);
      expect(res.body.table_info.reservation_info).toHaveLength(1);
      expect(res.body.table_info.remain).toEqual(10 - 1);
    });
    test('should return 400 and return error because reserved over limit of table available', async () => {
      await request(app)
        .post('/v1/reservation/reserv-table')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(failPayload)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
  describe('POST /v1/reservation/cancel-reserv-table', () => {
    let successPayload;
    let failPayload;
    beforeAll(() => {
      successPayload = {
        booking_id: bookingID,
      };
      failPayload = {
        booking_id: 'd4aSJIdjsA23',
      };
    });
    test('should return 200 and return array of tables_info that contain with cancel reservation_info and remain', async () => {
      const res = await request(app)
        .post('/v1/reservation/cancel-reserv-table')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(successPayload)
        .expect(httpStatus.OK);
      expect(Array.isArray(res.body.table_info.reservation_info)).toBe(true);
      expect(res.body.table_info.reservation_info).toHaveLength(1);
      expect(res.body.table_info.remain).toEqual(10);
    });
    test('should return 400 and return error because booking id not found', async () => {
      await request(app)
        .post('/v1/reservation/cancel-reserv-table')
        .set(
          'Authorization',
          `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ1MDM4NjgsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNTAzODY4fQ.mkGCcilBk-owOJJNtVep7MWhDpPtcHBv98UMjY5ezp0`
        )
        .send(failPayload)
        .expect(httpStatus.BAD_REQUEST);
    });
  });
});
