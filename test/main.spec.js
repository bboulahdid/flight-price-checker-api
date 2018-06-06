import { expect } from 'chai';
import request from 'supertest';

import app from '../src/main';
import projectInfo from '../package';

describe('main.js', () => {
  it('/status', (done) => {
    request(app)
      .get('/status')
      .expect(200, {
        name: projectInfo.name,
        description: projectInfo.description,
        version: projectInfo.version
      }, done);
  });
});
