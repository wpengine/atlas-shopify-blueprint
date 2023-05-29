import React from 'react';

/**
 * Render the ProductVariantOptions component.
 *
 * @param {Props} props The props object.
 * @param {string | number} props.sortValue The sortValue value.
 * @param {string | number} props.setSortValue The setSortValue value.
 * @param {Object<string, string>} props.collection The collection value.

 * @returns {React.ReactElement} The ProductVariantOptions component.
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
