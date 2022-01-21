import React from 'react';

import PropTypes from 'prop-types';

import Image from 'next/image';

import styles from './item.module.css';

const MAX_DESCRIPTION_LEN = 400;

function Item({ id, title, description, category, url, truncateDescription }) {
  if (description.length > MAX_DESCRIPTION_LEN && truncateDescription) {
    // eslint-disable-next-line no-param-reassign
    description = `${description.slice(0, MAX_DESCRIPTION_LEN)}...`;
  }

  return (
    <div>
      <div className={styles.item}>
        <span
          style={{
            paddingRight: '10px',
            paddingBottom: '5px',
            alignSelf: 'start',
            fontWeight: 'bold',
          }}
        >
          {id}
        </span>
        <div className={styles.image}>
          {url ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={url} alt="Error" width={75} />
          ) : (
            <Image
              alt="Mountains"
              src="/image-unavailable.jpg"
              height={100}
              width={100}
            />
          )}
        </div>
        <div className={styles.info}>
          <div className={styles.title}>Title: {title}</div>
          <div className={styles.category}>
            {' '}
            Category: <span style={{ fontStyle: 'italic' }}>{category}</span>
          </div>
          <div>
            <span style={{ fontWeight: 'bold' }}>Description</span>
            <br />
            <div
              className={styles.description}
              style={{ whiteSpace: 'pre-line' }}
            >
              {description}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  url: PropTypes.string,
  truncateDescription: PropTypes.bool,
};

Item.defaultProps = {
  truncateDescription: true,
  url: null,
};

export default Item;
