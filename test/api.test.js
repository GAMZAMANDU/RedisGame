import * as chaiModule from "chai";
import chaiHttp from "chai-http";

const chai = chaiModule.use(chaiHttp);
import { server } from "../index.js";

const { expect } = chai;


describe("생성 API 테스트", () => {
  it("POST /room should return a 201 status", (done) => {
    chai.request.execute(server)
      .post("/room")
      .end((err, res) => {
        expect(err).to.be.null;
        expect(res).to.have.status(201);
        expect(res.body).to.be.an("object");
        expect(res.body.message).to.be.a("string");
        expect(res.body.roomCode).to.be.a("string");

        done();
      });
  });
});

describe("생성 후 방 조회 API 테스트", () => {
  it("GET /room/:roomCode should return a 200 status", (done) => {
    chai.request.execute(server)
      .post("/room")
      .end((err, res) => {
        const { roomCode } = res.body;
        const { targetNumber } = res.body;
        
        chai.request.execute(server)
          .get(`/room/${roomCode}`)
          .query({ tryNumber : targetNumber })
          .end((err, res) => {
            // console.log(res.body);
            expect(err).to.be.null;
            expect(res).to.have.status(200);
            expect(res.body).to.be.an("object");
            expect(res.body.status).to.equal("일치하지 않음");

            done();
          });
      });

  it("GET /room/:roomCde, tryNumber != targetNumber -> should return 일치했습니다", (done) => {
    chai.request.execute(server)
    .GET
  })
});
