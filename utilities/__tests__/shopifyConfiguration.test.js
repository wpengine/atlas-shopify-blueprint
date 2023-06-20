import shopifyConfiguration from '../shopifyConfiguration';

describe('shopifyConfiguration', () => {

  describe('When the environment variables are set', () => {
    it('returns true', () => {
      expect(shopifyConfiguration.available()).toBeTruthy();
    });
  });

  describe('When the environment variables does not exist', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      delete process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN;
      delete process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL;
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });

  describe('When the environment variables are set to null', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN = null;
      process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL = null;
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });

  describe('When the NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL is invalid', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_SHOPIFY_GRAPHQL_URL = 'foo';
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });

  describe('When the NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN is empty', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_SHOPIFY_HEADLESS_PUBLIC_ACCESS_TOKEN = '';
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });
});
