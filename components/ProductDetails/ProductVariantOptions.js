import styles from './ProductVariantOptions.module.scss';
import classNames from 'classnames';
import VARIANT_MAP from '../../constants/variant-map';

/**
 * Render the ProductVariantOptions component.
 *
 * @param {Props} props The props object.
 * @param {string} props.selected The selected variant/color for this product.
 * @param {string | number} props.options The variant options for this product.
 * @param {(variant: string) => void} props.handleOptionChange The product variant/color handler. Selecting a variant/color for this product.
 *
 * @returns {React.ReactElement} The ProductVariantOptions component.
 */

const cx = classNames.bind(styles);

const ProductVariantOptions = ({ selected, options, handleOptionChange }) => {
  const handleChange = (e) => {
    handleOptionChange(e.target.value);
  };

  return (
    <div className={styles.formField}>
      {options?.map?.((option, index) => {
        const checked = selected?.toLowerCase() === option;
        return (
          <div
            className={styles.formOptionWrapper}
            key={`variant-option-${index}`}
          >
            <input
              type="radio"
              name={option}
              value={option}
              id={`variant-option-${option}`}
              data-testid={`variant-option-${option}`}
              aria-label={option}
              defaultChecked={checked}
              onClick={handleChange}
            />
            <label
              htmlFor={`variant-option-${option}`}
              className={styles.formOption}
            >
              <span
                className={cx(
                  styles.formOptionVariant,
                  styles.formOptionVariantPattern,
                  {
                    formOptionChecked: checked,
                  }
                )}
                style={{
                  backgroundColor: VARIANT_MAP[option],
                }}
              />
            </label>
          </div>
        );
      })}
    </div>
  );
};

export default ProductVariantOptions;
