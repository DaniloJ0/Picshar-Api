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

    test('When post liked, success', async () => {

        const payload = {
            id: user_id,
            post_id: '629234c9cade37cfc62d4342'
        }

        const res = await request(app)
        .post('/posts/like')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token)
        .send(payload);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });

    test('When post liked by user listed, success', async () => {

        const res = await request(app)
        .get(`/posts/liked-by?user_id=${user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(res.body instanceof Array).toBe(true);

    });

    test('When post saved, success', async () => {

        const payload = {
            id: user_id,
            post_id: '6293ee1f5ec8f80a3ca88395'
        }

        const res = await request(app)
        .post('/posts/save')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token)
        .send(payload);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });


    test('When posts saved by user listed, success', async () => {

        const res = await request(app)
        .get(`/posts/saved-by?id=${user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(res.body instanceof Array).toBe(true);

    });

    test('When post commented, success', async () => {

        const payload = {
            comment:'This post rocks ! congrats fellas!',
            post_id: '6293ee1f5ec8f80a3ca88395'
        }

        const res = await request(app)
        .post('/posts/')
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token)
        .send(payload);

        const { error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);

    });

    test('When comments post listed, success', async () => {

        const post_id = '6293ee1f5ec8f80a3ca88395';

        const res = await request(app)
        .get(`/posts/?post_id=${post_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token);

        const { comments, error, message } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(201);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(comments instanceof Array).toBe(true);
        expect(comments.some(c => c.bioComment === 'This post rocks ! congrats fellas!')).toBe(true);
    });

});