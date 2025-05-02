import React from 'react';
import styles from './BentoGallery.module.css';

const BentoGrid = ({ layout, images }) => {
  const gridTemplateAreas = layout.join(' ');

  return (
    <div
      className={styles.gridContainer}
      style={{ gridTemplateAreas }}
    >
      {images.map((image, index) => (
        <div
          key={index}
          className={styles.gridItem}
          style={{ gridArea: image.gridArea }}
        >
          <img
            src={image.url}
            alt={`Image for ${image.gridArea}`}
            className={styles.image}
            onError={(e) => {
              // e.target.src = 'https://via.placeholder.com/150?text=Image+Not+Found';
            }}
          />
        </div>
      ))}
    </div>
  );
};

export default BentoGrid;