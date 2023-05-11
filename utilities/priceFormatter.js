const priceFormatter = (amount = '0', currencyCode = 'USD') => {
  let locale;

  if (typeof navigator === 'undefined') {
    locale = 'en-US';
  } else {
    locale =
      navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
  }

  return new Intl.NumberFormat(locale, {
    style: 'currency',
    currency: currencyCode,
  }).format(amount);
};

export default priceFormatter;
