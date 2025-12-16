require('dotenv').config({ path: 'tests/.env' });
const config =require('../server/config/config');
const request = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');

let token;
describe('User API Tests... ', () => {

    beforeAll(async (done) => {
        await mongoose.connect(config.urlDB, { useNewUrlParser: true, useCreateIndex: true  }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            done();
        });
    });


    beforeAll((done) => {
        request(app)
          .post('/login')
          .send({
            email: process.env.TEST_EMAIL,
            password: process.env.TEST_PASSWORD,
          })
          .end((err, response) => {
            token = response.body.token; // save the token!
            done();
          });
      });

    test('should return status 401 Invalid token', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(401);
    });

    test('should return status 200 with a valid token', async () => {
        return request(app)
        .get('/users')
        .set('token', token)
        .then((response) => {
          expect(response.statusCode).toBe(200);
          expect(response.type).toBe('application/json');
        });
    });

    test('should return users', async () => {
        return request(app)
        .get('/users')
        .set('token', token)
        .then((response) => {
          expect(response.body.Users).toBeGreaterThan(0);
          expect(response.type).toBe('application/json');
        });
    });

    test('should create a new user', async () => {
        const res = await request(app)
            .post('/user')
            .send({
                name: 'Test',
                surnames: 'User',
                email: 'test.user@example.com',
                password: 'password123',
                address: '{}',
                creditCard: '{}',
                mobilePhone: '1234567890'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.ok).toBe(true);
        expect(res.body.usuario).toHaveProperty('_id');
    });

    test('should update a user', async () => {
        const newUser = await request(app)
            .post('/user')
            .send({
                name: 'Test',
                surnames: 'User',
                email: 'test.user.to.update@example.com',
                password: 'password123',
                address: '{}',
                creditCard: '{}',
                mobilePhone: '1234567890'
            });

        const userId = newUser.body.usuario._id;

        const res = await request(app)
            .put(`/user/${userId}`)
            .set('token', token)
            .send({
                name: 'Updated Test User'
            });
        expect(res.statusCode).toEqual(201);
        expect(res.body.ok).toBe(true);
        expect(res.body.user.name).toBe('Updated Test User');
    });

    afterAll(() => {
        mongoose.connection.close();
    });
})
