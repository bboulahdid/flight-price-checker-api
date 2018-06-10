import request from 'request-promise-native';

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

export { getStatus, getFlightsPrices };
