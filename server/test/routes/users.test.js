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
})
