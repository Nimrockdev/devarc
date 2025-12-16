const config = require('../server/config/config');
const request = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');
const categoryModel = require('../server/models/category');

describe('Category API Tests... ', () => {

    beforeAll(async (done) => {
        await mongoose.connect(config.urlDB, { useNewUrlParser: true, useCreateIndex: true  }, (err) => {
            if (err) {
                console.error(err);
                process.exit(1);
            }
            done();
        });
    });

    afterAll(() => {
        mongoose.connection.close();
    });

    let newCategoryId;

    it('should create a new category and return it', async () => {
        const response = await request(app)
            .post('/category')
            .send({ description: 'Test Category' });

        expect(response.status).toBe(201);
        expect(response.body.category).toBeDefined();
        expect(response.body.category.description).toBe('Test Category');
        newCategoryId = response.body.category._id;
    });

    it('should get all categories', async () => {
        const response = await request(app).get('/category');
        expect(response.status).toBe(200);
        expect(Array.isArray(response.body.categories)).toBe(true);
    });

    it('should delete the created category', async () => {
        const response = await request(app)
            .delete(`/category/${newCategoryId}`);
        expect(response.status).toBe(200);
    });
});
