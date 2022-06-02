import request from 'supertest';
import app from 'app';

describe('test cases', ()=> {

    test('init', async () => {

      const u_data = {
        username: 'profe',
      };
  
      const delete_ = await request(app)
          .delete('/users')
          .set('Content-Type', 'application/json')
          .send(u_data)
          .expect((200));
    });

    test('When valid data, success', async () => {

        const data = {
          username:"profe",
          password: "1234",
          email: `julioprofe@gmail.com`, 
          birthdate: "01/01/2020",
          biografia: "empty.",
        };
        
        const res = await request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
        expect(error).toBe(undefined);
    });

    test('When invalid data, error', async () => {

        const data = {
          username:"profe"
        };
        
        const res = await request(app)
        .post('/users')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(500);
        expect(error).not.toBe(undefined);
    });

});