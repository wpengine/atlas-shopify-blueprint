import styles from './ProductVariantOptions.module.scss';

const ProductVariantOptions = ({ selected, options, handleOptionChange }) => {
  return (
    <div className={styles.formField}>
      {options?.map?.((option, index) => (
        <div
          className={styles.formOptionWrapper}
          key={`variant-option-${index}`}
        >
          <input
            type='radio'
            name={option}
            value={option}
            id={`variant-option-${option}`}
            aria-label={option}
            checked={selected?.toLowerCase() === option}
            onChange={handleOptionChange}
          />
          <label
            htmlFor={`variant-option-${option}`}
            className={styles.formOption}
          >
            <span
              className={
                styles.formOptionVariant + ' ' + styles.formOptionVariantPattern
              }
              style={{
                backgroundColor: option,
              }}
            />
          </label>
        </div>
      ))}
    </div>
  );
};

export default ProductVariantOptions;
