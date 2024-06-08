const request = require('supertest');
const app = require('../app');
const { expect } = require('chai');

describe('User Login Workflow', () => {
  before(async () => {
    // Ustvari uporabnika za testiranje prijave
    await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });
  });

  it('should login user with correct credentials', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'password123'
      });

    expect(response.status).to.equal(200);
    expect(response.body.message).to.equal('Login successful, verification sent to mobile app');
  });

  it('should fail to login user with incorrect credentials', async () => {
    const response = await request(app)
      .post('/users/login')
      .send({
        username: 'testuser',
        password: 'wrongpassword'
      });

    expect(response.status).to.equal(401);
    expect(response.body.message).to.equal('Invalid username or password');
  });
});
