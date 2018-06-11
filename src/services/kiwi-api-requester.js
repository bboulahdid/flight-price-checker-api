import request from 'request-promise-native';

import logger from '../lib/logger';

const kiwiFlightsAPI = 'https://api.skypicker.com/flights';

/**
 * Build the response
 * @param {Object} [kiwiResponse = {}] - the KIWI API response
 * @return {Object} the built response
 */
const _buildResponse = (kiwiResponse = {}) => {
  if (kiwiResponse.data && kiwiResponse.data.length > 0) {
    // A variable to hold the destination country
    let country;
    const cities = kiwiResponse.data.map((flight) => {
      // If `countryTo` has a falsy value, assign `flight.countryTo.name` to it
      !country && (country = flight.countryTo.name);

      return {
        cityFrom: flight.cityFrom,
        cityTo: flight.cityTo,
        departureTime: flight.dTimeUTC,
        arrivalTime: flight.aTimeUTC,
        price: flight.price
      };
    });

    return { country, cities };
  }
  logger.warn('Received an empty response from KIWI flights API');
  return {};
};

/**
 * Get the price of each flight from one country to another
 * @async
 * @param {string} flyFrom - the departure country
 * @param {string} to - the destination country
 * @param {string} [curr = 'EUR'] - the currency
 * @return {Object} the built response
 */
const checkFlightsPrices = async (flyFrom, to, curr = 'EUR') => {
  logger.info(`Calling KIWI flights API (flyFrom: ${flyFrom}, to: ${to} curr: ${curr})`);
  const response = await request.get(kiwiFlightsAPI, {
    qs: { flyFrom, to, curr },
    json: true
  });
  return _buildResponse(response);
};

export { checkFlightsPrices };
