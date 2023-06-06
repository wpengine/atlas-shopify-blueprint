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
      delete process.env.NEXT_PUBLIC_SHOPIFY_TOKEN;
      delete process.env.NEXT_PUBLIC_SHOPIFY_URL;
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
      process.env.NEXT_PUBLIC_SHOPIFY_TOKEN = null;
      process.env.NEXT_PUBLIC_SHOPIFY_URL = null;
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });

  describe('When the NEXT_PUBLIC_SHOPIFY_URL is invalid', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_SHOPIFY_URL = 'foo';
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });

  describe('When the NEXT_PUBLIC_SHOPIFY_TOKEN is empty', () => {
    const OLD_ENV = process.env;

    beforeEach(() => {
      jest.resetModules();
      process.env.NEXT_PUBLIC_SHOPIFY_TOKEN = '';
    });

    afterAll(() => {
      process.env = { ...OLD_ENV };
    });

    it('returns false', () => {
      expect(shopifyConfiguration.available()).toBe(false);
    });
  });
});
