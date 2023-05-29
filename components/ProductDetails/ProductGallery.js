import styles from './ProductGallery.module.scss';

/**
 * Render the ProductGallery component.
 * @typedef {Object} Image
 * @property {string} altText The altText value.
 * @property {string} url The url value.
 *
 * @param {Props} props The props object.
 * @param {string} props.selected The selected source value.
 * @param {Image} props.image The image value.
 * @param {(image: Image) => void} props.handleImageChange The image change handler.
 *
 * @returns {React.ReactElement} The ProductGallery component.
 */

function ProductGallery({ selected, images, handleImageChange }) {
  const handleClick = (selectedImage) => {
    handleImageChange(selectedImage);
  };

  return (
    <>
      <div className={styles.featured}>
        <img src={selected} alt="product image" />
      </div>
      <div className={styles.productGallery}>
        <div className={styles.imageGrid}>
          {images.length > 1 &&
            images.map((image, index) => (
              <div className={styles.productImage} key={`slide-image-${index}`}>
                <img
                  src={image}
                  className={styles.productGalleryThumbnail}
                  key={`slide-image-${index}`}
                  data-testid={`slide-image-${index}`}
                  alt={image?.altText}
                  loading="lazy"
                  onClick={() => handleClick(image)}
                />
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
