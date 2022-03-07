'use strict';
const server = require('../src/server');
const signin = require('../src/routes/signin');
const signup =require('../src/routes/signup');
const superteset = require('supertest');
const request = superteset(server.app);
const {db} = require('../src/models/index');
const { idleTimeoutMillis } = require('pg/lib/defaults');

beforeAll( async () =>{
    await db.sync();
})
afterAll( async () =>{
    await db.drop();
})

describe('routes test',()=>{

it('signup test',async ()=>{
const response = await request.post('/signup').send({userName : 'bushra' ,
passWord : 'b7878'});
expect(response.status).toEqual(201);


})

it('signin',async()=>{
const response = await request.post('/signin').auth('bushra','b7878');
expect(response.status).toEqual(200);

})

it('test unvalid password',async()=>{
const response = await request.post('/signin').auth('bushra','8899b');
expect(response.status).toEqual(500);
})

it('test wrong username',async()=>{
    const response = await request.post('/signin').auth('sara','b7878');
    expect(response.status).toEqual(500);
})



})


describe('testing the server',()=>{
    it('testing 404 bad route',async()=>{
        const response = await request.get('/wrongpath');
        expect(response.status).toBe(404) 
    })
    it('testing 404',async()=>{
        const response = await request.post('/');
        expect(response.status).toBe(404) 
    })
});