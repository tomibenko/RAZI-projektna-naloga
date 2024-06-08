const request = require('supertest');
const app = require('../backend');
const { expect } = require('chai');

describe('User Creation Workflow', () => {
  it('should create a new user', async () => {
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser',
        email: 'testuser@example.com',
        password: 'password123'
      });

    expect(response.status).to.equal(201);
    expect(response.body).to.have.property('username', 'testuser');
  });

  it('should fail to create a user with existing username', async () => {
    // Poskusi ustvariti uporabnika z enakim uporabniškim imenom
    const response = await request(app)
      .post('/users')
      .send({
        username: 'testuser', // enako uporabniško ime
        email: 'anotheremail@example.com',
        password: 'password123'
      });

    expect(response.status).to.equal(500);
    expect(response.body.message).to.equal('Error when creating user.');
  });
});
