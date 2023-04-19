import styles from './ProductVariantOptions.module.scss';

const ProductVariantOptions = ({ options, onChange }) => {
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
            // checked={option.id === value}
            // onChange={() => onChange(option)}
          />
          <label className={styles.formOption}>
            {option.value_data?.colors?.map((color, index) => (
              <span
                title={option.label}
                className={
                  styles.formOptionVariant + ' ' + styles.formOptionVariantColor
                }
                style={{ backgroundColor: color }}
                key={index}
              />
            ))}
            <span
              title={option.label}
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
