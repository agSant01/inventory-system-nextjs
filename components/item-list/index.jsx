import PropTypes from 'prop-types';
import React, { useEffect, useState } from 'react';

import Image from 'next/image';

import Modal from 'react-modal';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';

import styles from './styles.module.css';

import Item from '../item/item';
import ItemEdit from '../item-edit';
import Paginator from '../paginator';

const animatedComponents = makeAnimated();

const customStyles = {
  content: {
    top: '50%',
    left: '25%',
    right: '25%',
    bottom: 'auto',
    marginRight: '-25%',
    transform: 'translate(-16%, -50%)',
  },
  overlay: {
    zIndex: 100,
  },
};

Modal.setAppElement('main');

function ItemList({ onEdit, onDelete, reload }) {
  // eslint-disable-next-line no-console
  console.log('Item List...');

  const [selectorOptions, setSelectorOptions] = useState([]);
  const [detailState, setDetailState] = useState({ isOpen: false, item: null });
  const [editState, setEditState] = useState({ isOpen: false, item: null });
  const [listState, setListState] = useState({ listState: 'loading' });
  const [itemList, setItemList] = useState({ data: [], total: 0 });
  const [selectedOption, setSelectedOption] = useState(null);
  const [paginationState, setPaginationState] = useState({
    currentPage: 1,
    limit: 15,
  });

  const updateCategorySelector = (data) => {
    const uniqueCategories = [...new Set(data.map(({ category }) => category))];
    uniqueCategories.sort();
    setSelectorOptions(
      uniqueCategories.map((category) => ({
        label: category,
        value: category,
      }))
    );
  };

  useEffect(() => {
    setListState({ listState: 'loading' });
    let queryString = '';
    if (selectedOption && selectedOption.length > 0) {
      queryString = `?category=${selectedOption}`;
    }

    fetch(`api/item${queryString}`)
      .then((res) => res.json())
      .then(({ data, total }) => {
        setItemList({
          data: data.map((value, index) => ({
            index: index + 1,
            ...value,
          })),
          total,
        });
        updateCategorySelector(data);
        setListState({ listState: 'ready' });
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`Error fetching items: ${error}`);
        setListState({ listState: 'error' });
      });
  }, [selectedOption, reload]);

  const closeModal = (modal) => {
    switch (modal) {
      case 'edit':
        setEditState({ isOpen: false, item: null });
        document.body.style.overflow = 'unset';
        break;
      case 'detail':
        setDetailState({ isOpen: false, item: null });
        document.body.style.overflow = 'unset';
        break;
      default:
        break;
    }
  };

  const setModalState = (item, modal, event) => {
    event?.preventDefault();
    switch (modal) {
      case 'detail':
        setDetailState({ isOpen: true, item: { ...item } });
        document.body.style.overflow = 'hidden';
        break;
      case 'edit':
        setEditState({ isOpen: true, item: { ...item } });
        document.body.style.overflow = 'hidden';
        break;
      default:
        break;
    }
  };

  const updateItem = (item) => {
    // eslint-disable-next-line no-console
    console.log(`Item to update: ${JSON.stringify(item)}`);
    fetch(`api/item/${item.id}`, {
      method: 'PUT',
      body: JSON.stringify({ item }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
      .then(() => {
        // eslint-disable-next-line no-console
        console.log(`Item update. New item: ${JSON.stringify(item)}`);

        Object.assign(
          itemList.data.find((value) => value.id === item.id),
          { ...item }
        );

        updateCategorySelector(itemList.data);

        if (onEdit) {
          onEdit(editState.item);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.error(`ERROR UPDATING: ${error}`);
      })
      .finally(() => {
        closeModal('edit');
      });
  };

  const internalDelete = (item) => {
    // console.log(`Item deleted: ${JSON.stringify(item)}`);
    fetch(`api/item/${item.id}`, {
      method: 'DELETE',
      body: JSON.stringify({ item }),
      headers: {
        'Content-Type': 'application/json',
      },
    }).then(() => {
      setPaginationState({ ...paginationState, currentPage: 1 });
      const updatedList = itemList.data.filter(
        (toFilter) => toFilter.id !== item.id
      );
      setItemList({
        data: updatedList,
        total: updatedList.length,
      });
      updateCategorySelector(updatedList);
      if (onDelete) {
        onDelete(item);
      }
    });
  };

  let list;
  switch (listState.listState) {
    case 'loading':
      list = (
        <div className={styles.loading}>
          <div className={styles.ldEllipsis}>
            <div />
            <div />
            <div />
            <div />
          </div>
        </div>
      );
      break;
    case 'ready':
      if (!itemList.data || itemList.data.length === 0) {
        list = (
          <div style={{ textAlign: 'center', alignItems: 'center' }}>
            <h3>No items available.</h3>
          </div>
        );
      } else {
        const start = (paginationState.currentPage - 1) * paginationState.limit;
        list = itemList.data
          .slice(start, start + paginationState.limit)
          .map((item) => (
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
                    <Image src="/edit-icon.png" width={25} height={25} />
                  </div>
                  <div
                    className={styles.deleteButton}
                    onClick={() => internalDelete(item)}
                    onKeyPress={() => internalDelete(item)}
                    tabIndex={0}
                    role="button"
                  >
                    <Image src="/delete.svg" width={25} height={25} />
                  </div>
                </div>
              </div>
            </div>
          ));
      }
      break;
    case 'error':
      list = (
        <h3 style={{ textAlign: 'center', color: 'red' }}>
          Error requesting items.
        </h3>
      );
      break;
    default:
      break;
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
          <Image src="/close.jpg" width={25} height={25} />
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
          <Image src="/close.jpg" width={25} height={25} />
        </button>
        {detailState.item && (
          <Item {...detailState.item} truncateDescription={false} />
        )}
      </Modal>
      <div className={styles.container}>
        <div className={styles.header}>
          <Select
            id="react-select-2-live-region"
            instanceId="react-select-2-live-region"
            options={selectorOptions}
            components={animatedComponents}
            placeholder="Filter items by category"
            listState={listState}
            closeMenuOnSelect
            isMulti={false}
            isClearable
            onChange={(selection) => {
              setSelectedOption(selection?.value);
              setPaginationState({
                ...paginationState,
                currentPage: 1,
              });
            }}
          />
        </div>
        <div className={styles.list}>{list}</div>
        <div className={styles.paginator}>
          <Paginator
            paginationState={paginationState}
            totalItems={itemList.total}
            onChangePage={({ currentPage, limit }) => {
              setPaginationState({ currentPage, limit });
            }}
          />
        </div>
      </div>
    </div>
  );
}

ItemList.propTypes = {
  reload: PropTypes.bool,
  onEdit: PropTypes.func,
  onDelete: PropTypes.func,
};

ItemList.defaultProps = {
  reload: false,
  onEdit: null,
  onDelete: null,
};

export default ItemList;
