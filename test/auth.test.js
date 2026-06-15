const request = require('supertest');
const app = require('../src/app');

describe('Authentication Flow', () => {
  
  describe('POST /auth/register', () => {
    it('should register a new user successfully', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(201);
      expect(response.body.user).toHaveProperty('email', 'test@example.com');
      expect(response.body.user).not.toHaveProperty('password');
    });

    it('should return error if email already exists', async () => {
      // Register first user
      await request(app)
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password123'
        });

      // Try to register with same email
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'duplicate@example.com',
          password: 'password456'
        });

      expect(response.status).toBe(409);
      expect(response.body.error).toBe('User already exists');
    });

    it('should return error if email or password is missing', async () => {
      const response = await request(app)
        .post('/auth/register')
        .send({
          email: 'test@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });
  });

  describe('POST /auth/login', () => {
    beforeEach(async () => {
      // Register a user before each login test
      await request(app)
        .post('/auth/register')
        .send({
          email: 'login@example.com',
          password: 'correctpassword'
        });
    });

    it('should login successfully with correct credentials', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'correctpassword'
        });

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('token');
      expect(response.body.user).toHaveProperty('email', 'login@example.com');
    });

    it('should return error with wrong password', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com',
          password: 'wrongpassword'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should return error if user does not exist', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'nonexistent@example.com',
          password: 'password123'
        });

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid credentials');
    });

    it('should return error if email or password is missing', async () => {
      const response = await request(app)
        .post('/auth/login')
        .send({
          email: 'login@example.com'
        });

      expect(response.status).toBe(400);
      expect(response.body.error).toBe('Email and password are required');
    });
  });

  describe('GET /api/protected', () => {
    let token;

    beforeEach(async () => {
      // Register and login to get token
      await request(app)
        .post('/auth/register')
        .send({
          email: 'protected@example.com',
          password: 'password123'
        });

      const loginResponse = await request(app)
        .post('/auth/login')
        .send({
          email: 'protected@example.com',
          password: 'password123'
        });

      token = loginResponse.body.token;
    });

    it('should access protected route with valid token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', `Bearer ${token}`);

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('message');
      expect(response.body.user).toHaveProperty('email');
    });

    it('should return error without token', async () => {
      const response = await request(app)
        .get('/api/protected');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('No token provided');
    });

    it('should return error with invalid token', async () => {
      const response = await request(app)
        .get('/api/protected')
        .set('Authorization', 'Bearer invalid.token.here');

      expect(response.status).toBe(401);
      expect(response.body.error).toBe('Invalid token');
    });
  });

  describe('GET /health', () => {
    it('should return health status', async () => {
      const response = await request(app)
        .get('/health');

      expect(response.status).toBe(200);
      expect(response.body).toHaveProperty('status', 'ok');
    });
  });
});
