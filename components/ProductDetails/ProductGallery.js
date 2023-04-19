import styles from './ProductGallery.module.scss';

function ProductGallery({ selected, images, handleImageChange }) {
  const handleClick = (selectedImage) => {
    handleImageChange(selectedImage);
  };

  return (
    <>
      <div className={styles.featured}>
        <img src={selected} alt='product image' />
      </div>
      <div className={styles.productGallery}>
        <div className={styles.imageGrid}>
          {images.map((image, index) => (
            <div className={styles.productImage} key={`slide-image-${index}`}>
              <img
                src={image?.url}
                className={styles.productGalleryThumbnail}
                key={`slide-image-${index}`}
                alt={image?.altText}
                loading='lazy'
                onClick={() => handleClick(image?.url)}
              />
            </div>
          ))}
        </div>
      </div>
    </>
  );
}

export default ProductGallery;
