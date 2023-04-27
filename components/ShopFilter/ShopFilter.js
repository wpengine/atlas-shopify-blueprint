import React from "react";

export const ShopFilter = ({ sortValue, setSortValue }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };
  return (
    <div className="sort-filter">
      <select role="combobox" onChange={handleChange} value={sortValue}>
        <option role="option" value="best-selling">
          Best selling
        </option>
        <option role="option" value="latest">
          Latest
        </option>
        <option role="option" value="price-asc">
          From Low to High Price
        </option>
        <option role="option" value="price-desc">
          From High to Low Price
        </option>
      </select>
    </div>
  );
};
