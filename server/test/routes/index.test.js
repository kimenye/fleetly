process.env.NODE_ENV = 'test';

const chai = require('chai');
const should = chai.should();
const chaiHttp = require('chai-http');
chai.use(chaiHttp);

const server = require('../../src/index');

describe('routes : index', () => {

  describe('GET /', () => {
    it('should return successful status', (done) => {
      chai.request(server)
      .get('/status')
      .end((err, res) => {
        should.not.exist(err);
        res.status.should.eql(200);
        res.type.should.eql('application/json');
        res.body.status.should.equal('success');
        res.body.message.should.eql('ok');
        done();
      });
    });
  });

  describe('GET /app', () => {
    it('should redirect all paths with /app to the spa', (done) => {
      chai.request(server)
        .get('/app/invites/0000-0000?email=example@domain.com')
        .end((err, res) => {
          should.not.exist(err);
          res.status.should.eql(200);
          res.type.should.eql('text/html');
          done();
        });
    });
  });

});
