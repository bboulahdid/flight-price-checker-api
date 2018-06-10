import server from '../src/main';

// Start the server before all tests
before((done) => {
  server.start(done);
});

// Stop the server after all tests
after(() => {
  server.stop();
});
