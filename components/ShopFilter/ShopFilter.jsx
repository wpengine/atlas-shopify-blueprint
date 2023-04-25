import React from "react";

export const ShopFilter = ({ sortValue, setSortValue }) => {
  const handleChange = (event) => {
    setSortValue(event.target.value);
  };
  return (
    <div className="sort-filter">
      <select onChange={handleChange} value={sortValue}>
        <option value="best-selling">Best selling</option>
        <option value="latest">Latest</option>
        <option value="price-asc">From Low to High Price</option>
        <option value="price-desc">From High to Low Price</option>
      </select>
    </div>
  );
};
