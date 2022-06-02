import request from 'supertest';
import app from 'app';

describe('test cases', ()=> {
    
    let token = '';
    let user_id = '';

    const data = {
        username:"leonardo",
        password: "1234"
    };

    beforeAll(async () => {
    const response = await request(app)
    .post('/users/login')
    .set('Content-Type', 'application/json')
    .send(data);

    token = response.body;

    //user id
    const id_ = await request(app)
    .post('/users/id')
    .set('Content-Type', 'application/json')
    .set('Authorization', `Bearer ${token}`)
    .set('token',token)
    .send({ username: data.username });

    user_id = id_.body;
    });


    test('When followers listed, success', async () => {

        const res = await request(app)
        .get(`/follows/followers/?user_id=${user_id}`)
        .set('Content-Type', 'application/json');

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(res.body instanceof Array).toBe(true);

    });

    test('When following listed, success', async () => {

        const res = await request(app)
        .get(`/follows/following/?user_id=${user_id}`)
        .set('Content-Type', 'application/json');

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(res.body instanceof Array).toBe(true);

    });

    test('When follow requested, success', async () => {

        const data  = {
            user: {
               id: user_id
            },
            user_id: '6293ed8bb7665eb3aae048c8'
        }

        const res = await request(app)
        .post('/follows/request')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });

    test('When follow accepted, success', async () => {

        const data  = {
            user: {
               id: '62912874eb514dcda4b87963'
            },
            request_id: '62977b5c9b55ead6c326d8ee',
            action: 'accept'
        }

        const res = await request(app)
        .post('/follows/response')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });

    test('When follow declined, success', async () => {

        const data  = {
            user: {
               id: '62912874eb514dcda4b87963'
            },
            request_id: '62977b5c9b55ead6c326d8ee',
            action: 'reject'
        }

        const res = await request(app)
        .post('/follows/response')
        .set('Content-Type', 'application/json')
        .send(data);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });

});