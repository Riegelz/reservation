# RESTful API Siam Piwat

Document for Siam Piwat Assignment :: Table Reservation

## Commands

To run a project (development mode) :

```bash
npm run test

```

To run a project (prod mode) :

```bash
npm run start
```

To run unit test (Jest) :

```bash
npm test
```

To Docker build (prod mode) :

```bash
# run docker container in development mode
npm run docker:prod

# run docker container in production mode
npm run docker:prod

# run all tests in a docker container
npm run docker:test
```

## Environment Variables

```bash
# Port number
PORT=3000

# URL of the Mongo DB
MONGODB_URL=mongodb://127.0.0.1:27017/node-boilerplate

# Reserv Config
SEAT_PER_TABLE=4
TOTAL_TABLE=10

# JWT
# JWT secret key
JWT_SAMPLE_EMAIL=asadej.w@gmail.com
JWT_SAMPLE_PASSWORD=Test1234
JWT_ACCESS_TOKEN_SECRET=EiKf9vBVMW0Qiu6EWgzwU7PyCdD0BLxv7ks4kTe4fXvGPDYsS3QT3wugV4ReGopt
```

## Project Structure

```
src\
 |--config\         # Environment variables and configuration related things
 |--controllers\    # Route controllers (controller layer)
 |--middlewares\    # Custom express middlewares
 |--routes\         # Routes
 |--services\       # Business logic (service layer)
 |--utils\          # Utility classes and functions
 |--validations\    # Request data validation schemas
 |--app.js          # Express app
 |--index.js        # App entry point
```

## API Documentation

URL : `http://localhost:3000` \
Bearer Token : `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2ODQ0OTAyNzAsImVtYWlsIjoiYXNhZGVqLndAZ21haWwuY29tIiwiaWF0IjoxNjgzNDkwMjcwfQ.-8sXAqULDYadPGEfkjZAfgsiVswpM-GdBw7EXKvcmOY`

### API Endpoints

**Auth routes**:\
`POST /v1/auth/get-token` - Get Auth Token

**Reservation routes**:\
`POST /v1/reservation/change-init-reservation` - Changed init table\
`GET /v1/reservation/get-reservation-info` - Get Reservation Info\
`POST /v1/reservation/reserv-table` - Table Reservation\
`POST /v1/reservation/cancel-reserv-table` - Cancel Reservation

**Document Spec**\
https://documenter.getpostman.com/view/1105911/2s93eYUCDj#6d8c9f0f-d182-4908-99ea-668d713c3889

## License

[MIT](LICENSE)
