import * as chaiModule from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);
import {server} from '../index.js';

const { expect } = chai;


describe("생성 API 테스트", () => {
  it("POST /room should return a 201 status", (done) => {
    chai.request.execute(server)
      .post('/room')
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an('object');
        expect(res.body.message).is.string;
        expect(res.body.roomCode).is.string;
        done();
      });
  });

  after(() => {
    server.close;
  })
});
