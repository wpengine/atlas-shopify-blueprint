import React from 'react';

export const ShopFilter = ({ sortValue, setSortValue, collection }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <select
      role='combobox'
      name='shop-filter'
      onChange={handleChange}
      value={sortValue}
      aria-label='shop-filter'
    >
      <option role='option' value={collection ? 'collection-latest' : 'latest'}>
        Latest
      </option>
      <option role='option' value='best-selling'>
        Best selling
      </option>
      <option role='option' value='price-asc'>
        Price: Low to High
      </option>
      <option role='option' value='price-desc'>
        Price: High to Low
      </option>
    </select>
  );
};
