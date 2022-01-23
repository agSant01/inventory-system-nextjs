/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.css';

function ItemAdd({ onChange, onSubmit }) {
  const internalItem = useRef({
    title: null,
    category: null,
    description: null,
    url: null,
  });

  const internalOnChange = (event) => {
    event.preventDefault();

    const key = event.target.name || undefined;

    if (key) {
      internalItem.current[key] = event.target.value || null;
    }

    if (onChange) {
      onChange(internalItem.current);
    }
  };

  const sendItem = async (event) => {
    event.preventDefault();

    await fetch('api/item', {
      method: 'POST',
      body: JSON.stringify({ item: internalItem.current }),
      headers: {
        'Content-Type': 'application/json',
      },
    });

    onSubmit(internalItem.current);

    event.target.reset();
    internalItem.current = {
      title: null,
      category: null,
      description: null,
      url: null,
    };
  };

  return (
    <form
      className={styles.form}
      onSubmit={sendItem}
      onChange={internalOnChange}
    >
      <div className={styles.group}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          autoComplete="title_inventory_app"
          placeholder="Title"
          required
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="description">Description</label>
        <textarea
          id="description"
          name="description"
          type="text"
          autoComplete="description_inventory_app"
          placeholder="Description"
          required
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="category">
          Category <br />
        </label>
        <input
          id="category"
          name="category"
          type="text"
          autoComplete="category_inventory_app"
          placeholder="Category"
          required
        />
      </div>
      <div className={styles.group}>
        <label htmlFor="url">Image URL (optional)</label>
        <input
          id="url"
          name="url"
          type="url"
          autoComplete="url_inventory_app"
          placeholder="Image URL (optional)"
        />
      </div>
      <button className={styles.addButton} type="submit">
        Add
      </button>
    </form>
  );
}

ItemAdd.propTypes = {
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
};

ItemAdd.defaultProps = {
  onChange: null,
};

export default ItemAdd;
