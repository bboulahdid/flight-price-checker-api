import { expect } from 'chai';

// import logger from '../../src/lib/logger';

import { getFlightsPrices } from '../test-helpers';

describe('/flights', () => {
  describe('error cases', () => {
    it('should return a 400 error response if \'from\' qs is empty', async () => {
      try {
        await getFlightsPrices('', 'fr,us');
      } catch (err) {
        expect(err.statusCode).to.equal(400);
        expect(err.error).to.deep.equal({
          error: {
            message: 'Bad request: \'from\' query string parameter is required.'
          }
        });
      }
    });

    it('should return a 400 error response if \'from\' qs value is invalid', async () => {
      try {
        await getFlightsPrices('xx', 'fr,us');
      } catch (err) {
        expect(err.statusCode).to.equal(400);
        expect(err.error).to.deep.equal({
          error: {
            message: 'Bad request: \'from\' value is not a valid ISO 3166 coutry code. e.g. \'FR\' for France.'
          }
        });
      }
    });

    it('should return a 400 error response if \'to\' qs is empty', async () => {
      try {
        await getFlightsPrices('ma', '');
      } catch (err) {
        expect(err.statusCode).to.equal(400);
        expect(err.error).to.deep.equal({
          error: {
            message: 'Bad request: \'to\' query string parameter is required.'
          }
        });
      }
    });

    it('should return a 400 error response if all country codes in \'to\' qs are invalid', async () => {
      try {
        await getFlightsPrices('ma', 'xx,yy,,w');
      } catch (err) {
        expect(err.statusCode).to.equal(400);
        expect(err.error).to.deep.equal({
          error: {
            message: 'Bad request: the destinations provided are not valid ISO 3166 coutry codes. ' +
              'e.g. \'FR,US,MA\' for France, USA and Morocco.'
          }
        });
      }
    });
  });

  describe('nominal cases', () => {
    // ...
  });
});
