import shopifyConfiguration from '../../utilities/shopifyConfiguration';
import styles from './ProductGallery.module.scss';

function ProductGallery({ selected, images, handleImageChange }) {
  if (!shopifyConfiguration.available()) {
    return null;
  }

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
