import React from 'react';

/**
 * Render the ShopFilter component.
 *
 * @param {Props} props The props object.
 * @param {string} props.sortValue The selected option on the base of which products will be filtered.
 * @param {string} props.setSortValue The selected option's value.
 * @param {string} props.collection Whether to show latest products by collection or all products.

 * @returns {React.ReactElement} The ShopFilter component.
 */

export const ShopFilter = ({ sortValue, setSortValue, collection }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <select
      role="combobox"
      name="shop-filter"
      onChange={handleChange}
      value={sortValue}
      aria-label="shop-filter"
    >
      <option role="option" value={collection ? 'collection-latest' : 'latest'}>
        Latest
      </option>
      <option role="option" value="best-selling">
        Best selling
      </option>
      <option role="option" value="price-asc">
        Price: Low to High
      </option>
      <option role="option" value="price-desc">
        Price: High to Low
      </option>
    </select>
  );
};
