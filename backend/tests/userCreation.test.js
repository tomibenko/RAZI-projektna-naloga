import request from 'supertest';
import { expect } from 'chai';
import app from '../backend/app';

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
});
