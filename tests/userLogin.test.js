const request = require('supertest');
const app = require('../backend');
const { expect } = require('chai');

describe('User Login Workflow', () => {
  it('should login user and verify login with Flask API', async () => {
    // Najprej moramo ustvariti uporabnika, da se lahko prijavi
    await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    // Nato testiramo prijavo
    const response = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Login successful, verification sent to mobile app');
  });
});
