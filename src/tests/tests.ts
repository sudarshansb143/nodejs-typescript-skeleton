import request from 'supertest';
import app from '../index';

describe('Users API', () => {
    let userId: string;

    it('should create a new user', async () => {
        const response = await request(app)
            .post('/users')
            .send({ name: 'John Doe', hobbies: ['Reading', 'Gardening'] })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        userId = response.body.id;
    });

    it('should get all users', async () => {
        const response = await request(app)
            .get('/users')
            .expect(200);

        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: userId })]));
    });

    it('should get a specific user', async () => {
        const response = await request(app)
            .get(`/users/${userId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', userId);
    });

    it('should update a user', async () => {
        const response = await request(app)
            .put(`/users/${userId}`)
            .send({ name: 'Updated Name' })
            .expect(200);

        expect(response.body).toHaveProperty('id', userId);
        expect(response.body).toHaveProperty('name', 'Updated Name');
    });

    it('should delete a user', async () => {
        await request(app)
            .delete(`/users/${userId}`)
            .expect(204);
    });
});

describe('Hobbies API', () => {
    let hobbyId: string;

    it('should create a new hobby', async () => {
        const response = await request(app)
            .post('/hobbies')
            .send({ passionLevel: 'High', name: 'Painting', year: 2021 })
            .expect(201);

        expect(response.body).toHaveProperty('id');
        hobbyId = response.body.id;
    });

    it('should get all hobbies', async () => {
        const response = await request(app)
            .get('/hobbies')
            .expect(200);

        expect(response.body).toEqual(expect.arrayContaining([expect.objectContaining({ id: hobbyId })]));
    });

    it('should get a specific hobby', async () => {
        const response = await request(app)
            .get(`/hobbies/${hobbyId}`)
            .expect(200);

        expect(response.body).toHaveProperty('id', hobbyId);
    });
    it('should delete a hobby', async () => {
        await request(app)
            .delete(`/hobbies/${hobbyId}`)
            .expect(204);
    });
});