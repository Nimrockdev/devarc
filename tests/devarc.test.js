const config = require('../server/config/config');
const request = require('supertest');
const app = require('../server/server');
const mongoose = require('mongoose');
const categoryModel = require('../server/models/category');

var id;
var desc;

let token;
describe('Devarc Test... ', () => {

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
            email: 'jsg8405@gmail.com',
            password: '',
          })
          .end((err, response) => {
            token = response.body.token; // save the token!
            done();
          });

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

    test('should return status 200 and return product 600ec6adddd7fc0015d10a6e', async () => {
        const res = await request(app).get('/products/searchByID/600ec6adddd7fc0015d10a6e');
        expect(res.statusCode).toEqual(200);
        expect(res.body.numProductos).toBeGreaterThan(0);
    });

    test('should return status 400 for not found product', async () => {
        const res = await request(app).get('/products/searchByID/AAA');
        expect(res.statusCode).toEqual(400);
    }); 
    
    test('should return status 401 Invalid token', async () => {
        const res = await request(app).get('/users');
        expect(res.statusCode).toEqual(401);
    });     

    test('should return status 200 Invalid token', async () => {
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

    test('should return Lenovo Mouse a1 product test', async () => {
        return request(app)
        .get('/products/searchByID/5f7701c99449505900f23333')
        .set('token', token)
        .then((response) => {          
          expect(response.body.numProductos).toBe(1)
          expect(response.type).toBe('application/json');

          let product = response.body.products[0];
          expect(product.avaiable).toEqual(true);

        });
    }); 

    
    // test('should return id category of Test8', async () => {
    //     var data = { 'description': 'Test8' };
        
    //     request(app)
    //     .post('/category')
    //     .send(data)
    //     .then((response) => {   
    //         id = response.body.category._id;
    //         expect(response.statusCode).toBe(201);
    //         expect(response.body.category._id).toBe(id);
    //         expect(response.body.category._id).not.toBeNull();
    //     });
        
    
    // }); 

    // it('should remove Category Test8 Category and return null successfully', async () => {
        
    //     await categoryModel.findByIdAndRemove({description : 'Test8'})
    //     const cateDeleted = await categoryModel.findById({_id : id})                   
    //     expect(cateDeleted).toBeNull() ;

    // });

    test('should return description pañales of id 600587e86bd460001551ce6b', async () => {
        let descCategory;
        //Category.find({})
        categoryModel.find({ _id : '600587e86bd460001551ce6b'})            
                .exec((err, category) => {
                    if (err) {  expect(err).toBe(err); };
                    descCategory = category[0].description;
                    expect(descCategory).toEqual('pañales');      
                });
  
    }); 

    it('should create & save Category Test 2 successfully', async () => {
        var data = { 'description': 'Test 2' };
        const validCategory = new categoryModel(data);
        const savedCategory = await validCategory.save();
        id = savedCategory._id;
        expect(savedCategory._id).toBeDefined();
        expect(savedCategory.description).toBe(validCategory.description);
    });


    it('should remove Category Test 2 Category and return null successfully', async () => {
        
        await categoryModel.findByIdAndRemove({_id : id})
        const cateDeleted = await categoryModel.findById({_id : id})                   
        expect(cateDeleted).toBeNull() ;

    });

    afterAll(() => {   
        mongoose.connection.close();
    });


})