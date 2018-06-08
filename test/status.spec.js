import request from 'request-promise-native';
import { expect } from 'chai';

import server from '../src/main';

import projectInfo from '../package';

describe('/status', () => {
  before((done) => {
    server.start(done);
  });

  after(() => {
    server.stop();
  });

  const port = process.env.PORT || 3000;

  it('should return 200 response', async () => {
    const response = await request.get(`http://127.0.0.1:${port}/api/status`, { json: true });
    expect(response).to.deep.equal({
      name: projectInfo.name,
      description: projectInfo.description,
      version: projectInfo.version
    });
  });
});
