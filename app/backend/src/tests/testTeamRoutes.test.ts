import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import TeamSequelize from '../database/models/TeamSequelize';

import { Response } from 'superagent';
import { teamsMock } from './mocks/teamsMock';

chai.use(chaiHttp);

const { expect } = chai;

describe('Teste da rota de times', () => {
  it('Deve retornar todos os times', async () => {
    const teams = TeamSequelize.bulkBuild(teamsMock);
    sinon.stub(TeamSequelize, 'findAll').resolves(teams);
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.an('array');
  });

  it('Deve retornar um time', async () => {
    const team = TeamSequelize.build(teamsMock[0]);
    sinon.stub(TeamSequelize, 'findByPk').resolves(team);
    const chaiHttpResponse = await chai
      .request(app)
      .get('/teams/1');

    expect(chaiHttpResponse.status).to.be.eq(200);
    expect(chaiHttpResponse.body).to.be.an('object');
  });

  });
