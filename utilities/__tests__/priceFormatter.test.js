import priceFormatter from '../priceFormatter';

describe('priceFormatter', () => {
  it('formats a non decimal price to double digit', () => {
    const price = priceFormatter('3');

    expect(price).toBe('$3.00');
  });

  it('formats a single decimal price to double digit', () => {
    const price = priceFormatter('3.5');

    expect(price).toBe('$3.50');
  });

  it('formats a double decimal price to double digit', () => {
    const price = priceFormatter('3.56');

    expect(price).toBe('$3.56');
  });

  it('formats an empty price to double digit zero', () => {
    const price = priceFormatter('');

    expect(price).toBe('$0.00');
  });

  it('formats a missing price to double digit zero', () => {
    const price = priceFormatter();

    expect(price).toBe('$0.00');
  });

  it('formats a price with a currency code other than USD', () => {
    const price = priceFormatter('3.56', 'EUR');

    expect(price).toBe('€3.56');
  });
});
