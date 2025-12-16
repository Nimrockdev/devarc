require('dotenv').config({ path: 'tests/.env' });
const config = require('../server/config/config');
const request = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');
const categoryModel = require('../server/models/category');

let token;
let testCategoryId;

describe('Devarc Test... ', () => {

    beforeAll(async (done) => {
        await mongoose.connect(config.urlDB, { useNewUrlParser: true, useCreateIndex: true }, (err) => {
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

    beforeAll(async () => {
        const category = new categoryModel({ description: 'Test Category' });
        const savedCategory = await category.save();
        testCategoryId = savedCategory._id;
    });

    afterAll(async () => {
        await categoryModel.findByIdAndRemove(testCategoryId);
        mongoose.connection.close();
    });


    test('should return status 200 and text message on the initial page', async () => {
        const res = await request(app).get('/');
        expect(res.statusCode).toEqual(200);
        expect(res.text).toBe('Devarc is online');
    });

    test('should return status 200 and return products', async () => {
        const res = await request(app).get('/products/');
        expect(res.statusCode).toEqual(200);
        expect(res.body.numProductos).toBeGreaterThan(0);
    });

    test('should return status 400 for not found product', async () => {
        const res = await request(app).get('/products/searchByID/AAA');
        expect(res.statusCode).toEqual(400);
    });

    test('should create a new product', async () => {
        const res = await request(app)
            .post('/products')
            .set('token', token)
            .send({
                name: 'Test Product',
                price: 10,
                priceCost: 5,
                description: 'Test Description',
                category: testCategoryId
            });
        expect(res.statusCode).toEqual(200);
        expect(res.body.ok).toBe(true);
        expect(res.body.productDB).toHaveProperty('_id');
    });

})
