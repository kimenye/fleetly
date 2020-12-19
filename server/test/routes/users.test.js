process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/index');
const knex = require('../../src/db/connection');

describe('routes : users', () => {

  beforeEach(() => {
    return knex.migrate.rollback()
    .then(() => { return knex.migrate.latest(); })
    .then(() => { return knex.seed.run(); });
  });

  afterEach(() => {
    return knex.migrate.rollback();
  });

  describe('GET /api/v1/users', () => {
    // it('should return all users', (done) => {
    //   chai.request(server)
    //   .get('/api/v1/users')
    //   .end((err, res) => {
    //     should.not.exist(err);
    //     res.status.should.equal(200);
    //     res.type.should.equal('application/json');
    //     res.body.status.should.eql('success');
    //     res.body.data.length.should.eql(1);
    //     res.body.data[0].should.include.keys(
    //       'id', 'email'
    //     );
    //     done();
    //   });
    // });
  })

  describe('GET /api/v1/users/invites/:id', () => {
    it('Should verify an email and invite pair', (done) => {

      let token = '0000-0000-0000-0000'
      let email = 'demo@example.com'

      chai.request(server)
        .get(`/api/v1/users/invites/${token}?email=${email}`)
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(200);
          res.body.data[0].should.include.keys('id', 'email');
          done()
        })
    })
  })

  describe('PUT /api/v1/users/:id', () => {
    it('Should be able to update a user', (done) => {
      knex('users')
        .select('*')
        .where({ email: 'demo@example.com' })
        .then((users) => {
          let user = users[0];

          chai.request(server)
            .put(`/api/v1/users/${user.id}`)
            .send({ name: 'Jane' })
            .end((err, res) => {
              should.not.exist(err);
              let newUser = res.body.data[0]
              newUser.name.should.not.eql(user.name);
              done();
            })
        })
    })
  })

  describe('POST /api/v1/users', () => {
    it('should check if an email exists before adding to waiting list', (done) => {

      chai.request(server)
        .post('/api/v1/users')
        .send({
          email: 'demo@example.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(422);
          res.type.should.equal('application/json');
          res.body.status.should.eql('error');
          done();
        })
    })

    it('should create an user if the email is new', (done) => {
      chai.request(server)
        .post('/api/v1/users')
        .send({
          email: 'new-user@example.com'
        })
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.equal(201);
          res.type.should.equal('application/json');
          res.body.status.should.eql('success');
          res.body.data[0].should.include.keys('id', 'email');
          done();
        })
    })
  })

  describe('GET /auth/twitter/request', () => {
    it('can request an oauth token', (done) => {
      chai.request(server)
        .get('/auth/twitter/request')
        .redirects(0)
        .end((err, res) => {
          should.not.exist(err);
          done();
        })
    })
  })
})
