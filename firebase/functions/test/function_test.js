const {shortenUrl} = require('../index');
const httpMocks = require('node-mocks-http');

describe('urlshort Functions', function() {
  const EXISTING_LONG_URL = 'https://nuxtjs.org/guide/vuex-store';
  const EXISTING_SHORT_URL_SNUG = 'd';

  this.timeout(3000);

  it('Shorten existing long url', (done) => {
    // TODO
    done();
  });

  after(async () => {
    setTimeout(() => process.exit(0), 250);
  });
});
