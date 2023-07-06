import * as sinon from "sinon";
import * as chai from "chai";
// @ts-ignore
import chaiHttp = require("chai-http");

import { app } from "../app";
import UserSequelize from "../database/models/UserSequelize";
import { userMock } from "./mocks/userMock";
import TokenJWT from "../utils/tokenJWT";
import validJwt from "../middlewares/validTokens";

chai.use(chaiHttp);

const { expect } = chai;

describe("Teste de login", () => {
  it("Deve retornar um erro 401", async () => {
    const stub = sinon.stub(UserSequelize, "findOne").resolves(userMock as any);
    sinon.stub(TokenJWT, "verify").returns(userMock as any);
    sinon.stub(validJwt, "validTokens").returns(userMock as any);
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: userMock.email,
      password: userMock.password,
    });
    expect(chaiHttpResponse.status).to.be.eq(401);
  });

  it("Deve retornar erro 400", async () => {
    const chaiHttpResponse = await chai.request(app).post("/login").send({
      email: "",
      passord: "",
    });

    expect(chaiHttpResponse.status).to.be.eq(400);
    expect(chaiHttpResponse.body).to.have.property("message");
  });
});
