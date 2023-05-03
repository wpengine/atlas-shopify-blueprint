import React from "react";

export const ShopFilter = ({ sortValue, setSortValue }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };

  return (
    <select role="combobox" onChange={handleChange} value={sortValue}>
      <option role="option" value="best-selling">
        Best selling
      </option>
      <option role="option" value="latest">
        Latest
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
