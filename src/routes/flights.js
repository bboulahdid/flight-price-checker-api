import { Router } from 'express';

import { isEmpty, isCountryCodeValid, extractDestinations, asyncMiddleware } from '../services/helpers';
import { checkFlightsPrices } from '../services/kiwi-api-requester';
import countryCodes from '../services/iso-3166-country-codes';

const router = new Router();

// Since it's a simple app, I leave the validation here
// No need to add a library for that
router.get('/flights', asyncMiddleware(async (req, res) => {
  const { from, to } = req.query;

  // Check if the required parameters are not empty
  if (isEmpty(from)) {
    throw new Error('Bad request: \'from\' query string parameter is required.');
  }

  if (isEmpty(to)) {
    throw new Error('Bad request: \'to\' query string parameter is required.');
  }

  // Check if the required parameters are valid
  if (!isCountryCodeValid(from)) {
    throw new Error('Bad request: \'from\' value is not a valid ISO 3166 coutry code. e.g. \'FR\' for France.');
  }

  const destinations = extractDestinations(to);

  if (destinations.length === 0) {
    throw new Error('Bad request: the destinations provided are not valid ISO 3166 coutry codes. ' +
      'e.g. \'FR,US,MA\' for France, USA and Morocco.');
  }

  // Send a request for each destination... in parallel
  const flights = await Promise.all(destinations.map(async (destination) => {
    return await checkFlightsPrices(from, destination);
  }));

  // If 'flights' array contains only empty objects, return an empty response
  const response = flights.filter((flight) => Object.keys(flight).length > 0).length > 0 ? {
    countryFrom: countryCodes.find((country) => country.code === from).name,
    countriesTo: flights
  } : {};

  res.status(200).json(response);
}));

export default router;
