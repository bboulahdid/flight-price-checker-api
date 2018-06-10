import { expect } from 'chai';

import { getStatus } from '../test-helpers';
import projectInfo from '../../package';

describe('/status', () => {
  it('should return 200 response', async () => {
    // Call GET /status API
    const response = await getStatus();

    expect(response).to.deep.equal({
      name: projectInfo.name,
      description: projectInfo.description,
      version: projectInfo.version
    });
  });
});
