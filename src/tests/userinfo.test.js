import request from 'supertest';
import app from 'app';
require('dotenv').config();

describe('test cases', ()=> {
    let token, user_posts, user_liked_posts, user_following, user_followers, user_id;

    const data = {
        username:"profe",
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

        // post's user
        await request(app)
        .get(`/posts/?author=${user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token).then((result) => user_posts = result.body?.length || 0);

        //post liked user
        await request(app)
        .get(`/posts/liked-by?user_id=${user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token).then((result) => user_liked_posts = result.body?.length || 0);

        // followers user
        await request(app)
        .get(`/follows/followers/?user_id=${user_id}`)
        .set('Content-Type', 'application/json').then((result) => user_followers = result.body?.length || 0);

        //following user
        await request(app)
        .get(`/follows/following/?user_id=${user_id}`)
        .set('Content-Type', 'application/json').then((result) => user_following = result.body?.length || 0);

    });

    test('When get info, password and birthdate should not be present. Post count, liked post count, followers count and following count should match.', async () => {

        const res = await request(app)
        .get(`/users/?user_id=${user_id}`)
        .set('Content-Type', 'application/json')
        .set('Authorization', `Bearer ${token}`)
        .set('token',token);

        const { birthdate, error, followed_count, followers_count, liked_count, message, password,posts_count, username } = res.body;

        expect(res.header['content-type']).toBe('application/json; charset=utf-8');
        expect(res.statusCode).toBe(200);
        expect(error).toBe(undefined);
        expect(message).toBe(undefined);
        expect(password).toBe(undefined);
        expect(birthdate).toBe(undefined);
        expect(username).toBe(data.username);

        // counters validation
        expect(posts_count).not.toBe(undefined);
        expect(liked_count).not.toBe(undefined);
        expect(followers_count).not.toBe(undefined);
        expect(followed_count).not.toBe(undefined);
        //counters match
        expect(posts_count).toEqual(user_posts);
        expect(liked_count).toEqual(user_liked_posts);
        expect(followers_count).toEqual(user_followers);
        expect(followed_count).toEqual(user_following);
    });
});