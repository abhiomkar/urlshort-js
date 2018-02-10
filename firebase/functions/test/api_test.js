const {
  shortenUrl,
  shortenUrlVal,
  getLongUrl,
  deleteUrlBySnug,
  getLongUrlVal,
} = require('../api');
const {ErrorCode} = require('../common');
const assert = require('assert');

describe('urlshort', function() {
  const EXISTING_LONG_URL = 'https://nuxtjs.org/guide/vuex-store';
  const EXISTING_SHORT_URL_SNUG = 'd';
  const timestamp = new Date().getTime();
  const newLongUrl = `https://test_random_long_url.com/${timestamp}`;
  let newShortUrlSnug;
  this.timeout(10000);

  it('Shorten a long url which is already existing in database', async () => {
    const result = await shortenUrl(EXISTING_LONG_URL);
    assert.equal(result, EXISTING_SHORT_URL_SNUG);
  });

  it('Shorten a new long url', async () => {
    const newShortUrlVal = await shortenUrlVal(newLongUrl);
    newShortUrlSnug = newShortUrlVal.snug;
    assert.ok(newShortUrlSnug, 'Expected some snug');
    assert.ok(/^[a-zA-Z0-9]+$/.test(newShortUrlSnug), 'Expeced a valid snug');
    assert.strictEqual(newShortUrlVal.views, 0);
  });

  it('Get long url of last short url', async () => {
    const result = await getLongUrl(newShortUrlSnug);
    assert.equal(result, newLongUrl);
  });

  it('Do not accept invalid long urls', async () => {
    const invalidLongUrl = 'fake <b>long</b> url test';
    await shortenUrlVal(invalidLongUrl).catch((result) => {
      assert.strictEqual(result.errorCode, ErrorCode.INVALID_URL);
    });
  });

  it('Do not accept long urls that has hosted (same) origins', async () => {
    const invalidLongUrl = 'https://urlshort.in/a8c';
    await shortenUrlVal(invalidLongUrl).catch((result) => {
      assert.strictEqual(result.errorCode, ErrorCode.ORIGIN_NOT_ALLOWED_IN_URL);
    });
  });

  it('Get short url code of existing long url', async () => {
    const result = await getLongUrlVal(EXISTING_SHORT_URL_SNUG);
    assert.equal(result.longUrl, EXISTING_LONG_URL);
  });

  it('Get short url code of long url which does not exist in database', async () => {
    const result = await getLongUrl('test_random_short_url_code');
    assert.strictEqual(result, undefined);
  });

  it('Update view count when accessing long url from short url code', async () => {
    await getLongUrlVal(newShortUrlSnug, true /** updateViewCount */);
    const longUrlVal = await getLongUrlVal(newShortUrlSnug);
    const shortUrlVal = await shortenUrlVal(newLongUrl);
    assert.strictEqual(longUrlVal.views, 1);
    assert.strictEqual(shortUrlVal.views, 1);
  });

  after(async () => {
    // Clean up and exit.
    await deleteUrlBySnug(newShortUrlSnug);
    setTimeout(() => process.exit(0), 250);
  });
});
