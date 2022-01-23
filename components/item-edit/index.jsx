/* eslint-disable jsx-a11y/label-has-associated-control */
import React, { useRef } from 'react';

import PropTypes from 'prop-types';

import styles from './styles.module.css';

function ItemEdit({ item, onChange, onSubmit, currentValue }) {
  // Use reference to maintain value in between renders
  const internalItem = useRef(
    currentValue || {
      id: null,
      createdAt: null,
      title: null,
      category: null,
      description: null,
      url: null,
    }
  );

  /**
   * Listener for changes on the input fields
   * @param {React.FormEventHandler<HTMLFormElement} event
   */
  const internalOnChange = (event) => {
    event.preventDefault(); // prevent default behaviour which is page reload
    const key = event.target.name || undefined;
    if (key) {
      internalItem.current[key] = event.target.value || null;
    }
    item(internalItem.current);
    if (onChange) {
      onChange(internalItem.current);
    }
  };

  /**
   * Submited form handler
   * @param {React.FormEventHandler<HTMLFormElement} event
   */
  const onSubmitItem = (event) => {
    event.preventDefault(); // prevent default behaviour which is page reload
    onSubmit(internalItem.current);
    event.target.reset(); // reset form
    internalItem.current = {
      id: null,
      createdAt: null,
      title: null,
      category: null,
      description: null,
      url: null,
    };
  };

  return (
    <form
      className={styles.form}
      onSubmit={onSubmitItem}
      onChange={internalOnChange}
    >
      <h2>Edit Item</h2>
      <div className={styles.group}>
        <label htmlFor="title">Title</label>
        <input
          id="title"
          name="title"
          type="text"
          autoComplete="title_inventory_app"
          placeholder="Title"
          required
          defaultValue={internalItem.current.title}
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
          defaultValue={internalItem.current.description}
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
          defaultValue={internalItem.current.category}
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
          defaultValue={internalItem.current.url}
        />
      </div>
      <button className={styles.addButton} type="submit">
        Edit
      </button>
    </form>
  );
}

ItemEdit.propTypes = {
  item: PropTypes.func.isRequired,
  onChange: PropTypes.func,
  onSubmit: PropTypes.func.isRequired,
  currentValue: PropTypes.shape({
    title: PropTypes.string,
    category: PropTypes.string.isRequired,
    description: PropTypes.string,
    url: PropTypes.string,
  }),
};

ItemEdit.defaultProps = {
  onChange: null,
  currentValue: null,
};

export default ItemEdit;
