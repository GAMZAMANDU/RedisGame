import * as chaiModule from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);
import {server} from '../index.js';

const { expect } = chai;


describe("생성 API 테스트", () => {
  it("GET /room should return a 200 status", (done) => {
    chai.request.execute(server)
      .get('/room')
      .end((err, res) => {
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        done();
      });
  });
});
