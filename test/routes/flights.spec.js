import { expect } from 'chai';
import nock from 'nock';

import { getFlightsPrices, stubKiwiAPI } from '../test-helpers';

import kiwiAPIRespMAtoFR from '../fixtures/kiwi-api-responses/ma-to-fr';
import kiwiAPIRespMAtoUS from '../fixtures/kiwi-api-responses/ma-to-us';
import expectedRespMAtoFR from '../fixtures/responses/ma-to-fr-response';
import expectedRespMAtoFRandUS from '../fixtures/responses/ma-to-fr-and-us-response';

describe('/flights', () => {
  after(() => {
    nock.cleanAll();
  });

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
            message: 'Bad request: \'from\' value is not a valid ISO 3166 country code. e.g. \'FR\' for France.'
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
            message: 'Bad request: the destinations provided are not valid ISO 3166 country codes. ' +
              'e.g. \'FR,US,MA\' for France, USA and Morocco.'
          }
        });
      }
    });

    it('should return a 500 error response if KIWI API is unreachable', async () => {
      const stub = stubKiwiAPI('MA', 'FR', 500);
      try {
        await getFlightsPrices('ma', 'fr');
      } catch (err) {
        stub.done();
        expect(err.statusCode).to.equal(500);
      }
    });
  });

  describe('nominal cases', () => {
    it('should return a 200 response if qs params are valid', async () => {
      const stub = stubKiwiAPI('MA', 'FR', 200, kiwiAPIRespMAtoFR);

      const response = await getFlightsPrices('ma', 'fr');

      stub.done();
      expect(response).to.deep.equal(expectedRespMAtoFR);
    });

    it('should call KIWI API for each valid destination', async () => {
      const maTofrStub = stubKiwiAPI('MA', 'FR', 200, kiwiAPIRespMAtoFR);
      const maToUsStub = stubKiwiAPI('MA', 'US', 200, kiwiAPIRespMAtoUS);

      const response = await getFlightsPrices('ma', 'fr,,xxx,us,3f,,d');

      maTofrStub.done();
      maToUsStub.done();
      expect(response).to.deep.equal(expectedRespMAtoFRandUS);
    });

    it('should return an empty response when when there is no data in KIWI API response', async () => {
      const stub = stubKiwiAPI('MA', 'FR', 200);

      const response = await getFlightsPrices('ma', 'fr');

      stub.done();
      expect(response).to.be.empty;
    });
  });
});
