import React, { useState } from 'react';

import Modal from 'react-modal';

import Image from 'next/image';
import PropTypes from 'prop-types';
import Item from '../item/item';

import styles from './styles.module.css';
import ItemEdit from '../item-edit';

const customStyles = {
  content: {
    top: '50%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
    marginRight: '-25%',
    transform: 'translate(-16%, -50%)',
  },
};
Modal.setAppElement('main');

function ItemList({ items, onEdit, onDelete }) {
  // eslint-disable-next-line no-console
  console.log('Item List...');

  const [detailState, setDetailState] = useState({ isOpen: false, item: null });
  const [editState, setEditState] = useState({ isOpen: false, item: null });

  const closeModal = (modal) => {
    switch (modal) {
      case 'edit':
        setEditState({ isOpen: false, item: null });
        break;
      case 'detail':
        setDetailState({ isOpen: false, item: null });
        break;
      default:
        break;
    }
  };

  const setModalState = (item, modal, event) => {
    event?.preventDefault();
    switch (modal) {
      case 'detail':
        setDetailState({ isOpen: true, item });
        break;
      case 'edit':
        setEditState({ isOpen: true, item });
        break;
      default:
        break;
    }
  };

  const updateItem = (item) => {
    // eslint-disable-next-line no-console
    console.log(`Item update. New item: ${JSON.stringify(item)}`);
    closeModal('edit');
    if (onEdit) {
      onEdit(editState.item);
    }
  };

  const internalDelete = (item) => {
    if (onDelete) {
      onDelete(item);
    }
  };

  let list;

  if (!items || items.length === 0) {
    list = (
      <div style={{ textAlign: 'center', alignItems: 'center' }}>
        <h3>No items available.</h3>
      </div>
    );
  } else {
    list = items.map((item) => (
      <div key={item.id}>
        <div className={styles.item}>
          <div
            onClick={(event) => setModalState(item, 'detail', event)}
            onKeyPress={(event) => setModalState(item, 'detail', event)}
            role="button"
            tabIndex={0}
            style={{ flexGrow: 1 }}
          >
            <Item {...item} truncateDescription />
          </div>
          <div className={styles.actionButtons}>
            <div
              className={styles.editButton}
              onClick={() => setModalState(item, 'edit')}
              onKeyPress={() => setModalState(item, 'edit')}
              tabIndex={0}
              role="button"
            >
              <Image src="/edit-icon.png" width={30} height={30} />
            </div>
            <div
              className={styles.deleteButton}
              onClick={() => internalDelete(item)}
              onKeyPress={() => internalDelete(item)}
              tabIndex={0}
              role="button"
            >
              <Image src="/delete.svg" width={30} height={30} />
            </div>
          </div>
        </div>
      </div>
    ));
  }

  return (
    <div>
      {/* EDIT MODAL */}
      <Modal
        isOpen={editState.isOpen}
        onRequestClose={() => closeModal('edit')}
        style={customStyles}
        contentLabel="Item edit Modal"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => closeModal('edit')}
        >
          <Image src="/close.jpg" width={20} height={20} />
        </button>
        <ItemEdit
          item={(item) => setModalState(item, 'edit')}
          onSubmit={updateItem}
          currentValue={editState.item}
        />
      </Modal>
      {/* DETAIL MODAL */}
      <Modal
        isOpen={detailState.isOpen}
        onRequestClose={() => closeModal('detail')}
        style={customStyles}
        contentLabel="Item detail modal"
      >
        <button
          className={styles.closeButton}
          type="button"
          onClick={() => closeModal('detail')}
        >
          <Image src="/close.jpg" width={20} height={20} />
        </button>
        {detailState.item && (
          <Item {...detailState.item} truncateDescription={false} />
        )}
      </Modal>
      <div className={styles.container}>{list}</div>
    </div>
  );
}

ItemList.propTypes = {
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
  items: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      title: PropTypes.string.isRequired,
      category: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
};

ItemList.defaultProps = {
  onEdit: null,
  onDelete: null,
};

export default ItemList;
