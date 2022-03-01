const request = require('supertest');
const server = require('./server')
const db = require('../data/dbConfig')

beforeAll(async ()=>{
  await db.migrate.rollback()
  await db.migrate.latest()
})

beforeEach(async ()=>{
  await db('users').truncate()
})

afterAll(async ()=>{
  await db.destroy()
})

// test('sanity', () => {
//   expect(true).toBe(false)
// })

//Register Endpoint Testing
describe("[POST] /api/auth/register", ()=>{
  it("should return a 401 error when no username is entered", async () => {
      const res = await request(server)
        .post('/api/auth/register')
        .send({password: 'foobar'})
      expect(res.status).toBe(401)
      expect(res.body.message).toMatch('username and password required')
  })

  it('successfully adds user to database', async () => {
    const res = await request(server)
      .post('/api/auth/register')
      .send({username: 'David', password: 'Aihe'})

    let currentUsers = await db('users')
    expect(res.status).toBe(201)
    expect(currentUsers).toHaveLength(1)
  })

  it("respond with 400 status code due to username being taken", async ()=>{
    await db("users").insert({username: 'David', password: 'Aihe'});
    const res = await request(server)
      .post("/api/auth/register")
      .send({username: 'David', password: 'Aihe'});
    expect(res.status).toBe(400)
  })
})

//Login Endpoint Testing
describe('[POST] /api/auth/login', () => {
  beforeAll(async () => {
    await request(server)
      .post('/api/auth/register')
      .send({username: 'David', password: 'Aihe'})
  })

  test('sends error when missing a username', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({password: 'Aihe'})

    expect(res.status).toBe(401)
    expect(res.body.message).toMatch('username and password required')
  })

  test('sends error when using incorrect password', async () => {
    const res = await request(server)
      .post('/api/auth/login')
      .send({username: 'David', password: 'NotAihe'})

    expect(res.status).toBe(401)
    expect(res.body.message).toMatch('invalid credentials')
  })
})