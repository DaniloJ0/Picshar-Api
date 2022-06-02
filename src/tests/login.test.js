import request from 'supertest';
import app from 'app';

describe('test cases', ()=> {

    test('When valid data, success', async () => {

        const data = {
          username:"profe",
          password: "1234"
        };
        
        const res = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
    });

    test('When user does not exists, warning', async () => {

        const data = {
          username:"cesarni",
          password: "1234"
        };
        
        const res = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(data);

        const {error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(404);
        expect(error).toBe(undefined);
        expect(message).not.toBe(undefined);
        expect(message).toEqual("User not found");
    });

    test('When password is incorrect, warning', async () => {

        const data = {
          username:"profe",
          password: "sdfsfdsfsfs"
        };
        
        const res = await request(app)
        .post('/users/login')
        .set('Content-Type', 'application/json')
        .send(data);

        const {error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(401);
        expect(error).toBe(undefined);
        expect(message).not.toBe(undefined);
        expect(message).toEqual("Incorrect password");
    });

});