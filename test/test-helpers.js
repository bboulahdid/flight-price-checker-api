import request from 'request-promise-native';
import nock from 'nock';

const port = process.env.PORT || 3000;

const baseURL = `http://127.0.0.1:${port}/api`;

/**
 * Request the /status API
 * @async
 * @return {Object} the JSON response
 */
const getStatus = async () => {
  return await request.get(`${baseURL}/status`, { json: true });
};

/**
 * Intercept the call to the KIWI API and send the desired response
 *
 * @param {string} flyFrom - the departure coutry
 * @param {string} to - the arrival coutry
 * @param {number} statusCode - the response status code
 * @param {Object} resp - the desired response
 * @return {Nock}
 */
const stubKiwiAPI = (flyFrom, to, statusCode, resp) => {
  return nock('https://api.skypicker.com')
    .get('/flights')
    .query({ flyFrom, to, curr: 'EUR' })
    .reply(statusCode, resp);
};

/**
 * Request the /flights API
 * @async
 * @param {string} from - the departure country
 * @param {string} to - a comma separated string that represent the destinations. e.g. "fr,us,ma"
 * @return {Object} the JSON response
 */
const getFlightsPrices = async (from, to) => {
  return await request.get(`${baseURL}/flights`, {
    qs: { from, to },
    json: true
  });
};

export { getStatus, stubKiwiAPI, getFlightsPrices };
