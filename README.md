# Flight price checker API
[![Build Status](https://travis-ci.com/bboulahdid/flight-price-checker-api.svg?token=8Kgkg1URdhKKnJMew8we&branch=master)](https://travis-ci.com/bboulahdid/flight-price-checker-api)

A simple flight price checker API with express.js on top of [kiwi](https://docs.kiwi.com/) API

## Getting started

To install the project's dependencies :

```bash
yarn
```

> or `npm install` if you're old and miserable

To run tests :

```bash
yarn test
```

To build everything & start the server :

```bash
yarn start
```

## API :

This mini project provides 2 APIs :
* `GET /api/status`: it returns some information about the project (name, version, description)
* `GET /api/flights`: it returns all flights, if there is any, between two countries. It needs two required query string parameters :
  * `from`: the ISO 3166 country code of the departure country. e.g. 'FR' for France.
  * `to`: a comma separated string of ISO 3166 country codes of the arrival countries. e.g. 'FR,US' for France & USA.

## TODO :
- [ ] Handle `uncaughtException` and `unhandledRejection` errors
