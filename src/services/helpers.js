import countryCodes from './iso-3166-country-codes';

// FR, us and mA are valid values. XX7 and d5 are not
const _countryCodePattern = /^[a-zA-Z]{2}$/;

// A private variable to hold all country codes
const _countryCodes = countryCodes.map((country) => country.code);

/**
 * Check if a string is empty
 * @param {string} str - the string to check
 * @return {boolean} true if the string is empty, false otherwise
 */
const isEmpty = (str) => str.trim().length === 0;

/**
 * Check if a country code is valid
 * @param {string} countryCode - the country code
 * @return {boolean} true if the country code is valid, false otherwise
 */
const isCountryCodeValid = (countryCode) => {
  return countryCode.match(_countryCodePattern) && _countryCodes.includes(countryCode);
};

/**
 * Extract & filter destinations from a comma separated string
 * @param {string} to - a comma separated string. e.g. "fr,us,ma,,xxx"
 * @return {string[]} a list of valid destinations. e.g. ["FR", "US", "MA"]
 */
const extractDestinations = (to) => {
  return to.split(',').filter((dest) => !isEmpty(dest) && isCountryCodeValid(dest));
};

/**
 * An async wrapper around express handlers
 * @param {Object} handler
 * @return {Object}
 */
const asyncMiddleware = (handler) => {
  return async (req, res, next) => {
    try {
      await handler(req, res);
    } catch (error) {
      next(error);
    }
  };
};

export { isEmpty, isCountryCodeValid, extractDestinations, asyncMiddleware };
