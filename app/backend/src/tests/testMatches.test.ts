import * as sinon from "sinon";
import MatchesSequelize from "../database/models/MatchesSequelize";
import { matchesMock, matchesMockPost, matchesUpdates } from "./mocks/matchesMock";
import { app } from "../app";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");
import { log } from "console";
import TokenJWT from "../utils/tokenJWT";
import { tokenMock } from "./mocks/tokenMock";
chai.use(chaiHttp);
const { expect } = chai;

describe("Teste de partidas", () => {
  afterEach(() => {
    sinon.restore();
  });

  describe("Testes do endPointGet", () => {
    it("Deve retornar todas as partidas", async () => {
      const matchesBuild = matchesMock.map((match) =>
        MatchesSequelize.build(match)
      );
      sinon.stub(MatchesSequelize, "findAll").resolves(matchesBuild);
      const { body, status } = await chai.request(app).get("/matches");
      expect(status).to.be.equal(200);
      expect(body).to.be.an("array");
      expect(body).to.be.deep.equal(matchesMock);
    });
    it(" Retornar as partidas com progresso verdadeiro", async () => {
      const matchesBuild = matchesMock.map((match) =>
        MatchesSequelize.build(match)
      );
      sinon.stub(MatchesSequelize, "findAll").resolves(matchesBuild);
      const { body, status } = await chai
        .request(app)
        .get("/matches?inProgress=true");
      expect(status).to.be.equal(200);
      expect(body).to.be.an("array");
      expect(body).to.be.deep.equal([matchesMock[0]]);
    });
    it(" Retornar as partidas com progresso falso", async () => {
      const matchesBuild = matchesMock.map((match) =>
        MatchesSequelize.build(match)
      );
      sinon.stub(MatchesSequelize, "findAll").resolves(matchesBuild);
      const { body, status } = await chai
        .request(app)
        .get("/matches?inProgress=false");
      expect(status).to.be.equal(200);
      expect(body).to.be.an("array");
      expect(body).to.be.deep.equal([matchesMock[1]]);
    });
  });
  describe("Testes do endPointPatch", () => {
    it('Deve retornar "Finished"', async () => {
      sinon.stub(TokenJWT, "verify").returns({ id: 1 });
      sinon.stub(MatchesSequelize, "update").resolves([1]);
      const { body, status } = await chai
        .request(app)
        .patch("/matches/1/finish")
        .set({ Authorization: tokenMock });
      expect(status).to.be.equal(200);
      expect(body.message).to.be.equal("Finished");
    });
    it("Deve retornar messagem de token invalido", async () => {
      const { body, status } = await chai
        .request(app)
        .patch("/matches/1/finish")
        .set({ Authorization: "ivalid" });
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Token must be a valid token");
    });
    it("Deve retornar messagem de token não encontrado", async () => {
      const { body, status } = await chai
        .request(app)
        .patch("/matches/1/finish");
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Token not found");
    });
  });
  describe("Teste de atualizações de dados da partida", () => {
    it("Retornar uma partida atualizada", async () => {
      sinon.stub(TokenJWT, "verify").returns({ id: 1 });
      sinon.stub(MatchesSequelize, "update").resolves([1]);
      const update = MatchesSequelize.build(matchesUpdates);
      sinon.stub(MatchesSequelize, "findByPk").resolves(update);

      const { body, status } = await chai
        .request(app)
        .patch("/matches/2")
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set({ Authorization: tokenMock });

      expect(status).to.be.equal(200);
      expect(body).to.be.deep.equal(matchesUpdates);

    });
    it("partida não encontrada", async () => {
      sinon.stub(TokenJWT, "verify").returns({ id: 1 });
      sinon.stub(MatchesSequelize, "update").resolves([0]);
      sinon.stub(MatchesSequelize, "findByPk").resolves(null);

      const { body, status } = await chai
        .request(app)
        .patch("/matches/2")
        .send({
          homeTeamGoals: 1,
          awayTeamGoals: 1,
        })
        .set({ Authorization: tokenMock });

      expect(status).to.be.equal(404);
      expect(body.message).to.be.equal("Match not found");

    });
    it("Deve retornar messagem de token invalido", async () => {
      const { body, status } = await chai
        .request(app)
        .patch("/matches/1")
        .set({ Authorization: "ivalid" });
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Token must be a valid token");
    });
    it("Deve retornar messagem de token não encontrado", async () => {
      const { body, status } = await chai
        .request(app)
        .patch("/matches/1");
      expect(status).to.be.equal(401);
      expect(body.message).to.be.equal("Token not found");
    });

  });
  describe("Teste de criação de partida", () => {
    it("Deve retornar uma partida criada", async () => {
      sinon.stub(TokenJWT, "verify").returns({ id: 1 });
      const create = MatchesSequelize.build(matchesMock[0]);
      sinon.stub(MatchesSequelize, "create").resolves(create);
      const { body, status } = await chai
        .request(app)
        .post("/matches")
        .send(matchesMockPost)
        .set({ Authorization: tokenMock });
      expect(status).to.be.equal(201);
      expect(body).to.be.deep.equal(matchesMock[0]);

    });
  });
});
