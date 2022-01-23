import React from 'react';

import PropTypes from 'prop-types';

import Image from 'next/image';

import Select from 'react-select';

import styles from './styles.module.css';

function Paginator({ paginationState, totalItems, onChangePage }) {
  const itemsOptions = [
    {
      label: '10',
      value: 10,
    },
    {
      label: '15',
      value: 15,
    },
    {
      label: '25',
      value: 25,
    },
  ];

  const setState = (newState) => {
    onChangePage(newState);
  };

  return (
    <div className={styles.paginator}>
      <div className={styles.switches}>
        <button
          type="button"
          disabled={paginationState.currentPage - 1 <= 0}
          onClick={() => {
            setState({
              ...paginationState,
              currentPage: paginationState.currentPage - 1,
            });
          }}
        >
          <Image src="/arrow_back_ios_black_24dp.svg" width={20} height={20} />
        </button>
        <div>
          Page {paginationState.currentPage} of{' '}
          {Math.ceil(totalItems / paginationState.limit) || 'n/a'}
        </div>
        <button
          type="button"
          disabled={
            paginationState.currentPage + 1 >
            Math.ceil(totalItems / paginationState.limit)
          }
          onClick={() => {
            setState({
              ...paginationState,
              currentPage: paginationState.currentPage + 1,
            });
          }}
        >
          <Image
            src="/arrow_forward_ios_black_24dp.svg"
            width={20}
            height={20}
          />
        </button>
      </div>
      <div className={styles.itemsPerPage}>
        <span>Items per page</span>
        <Select
          options={itemsOptions}
          defaultValue={itemsOptions[1]}
          onChange={({ value }) =>
            setState({ ...paginationState, limit: value, currentPage: 1 })
          }
        />
      </div>
    </div>
  );
}

Paginator.propTypes = {
  paginationState: PropTypes.shape({
    currentPage: PropTypes.number.isRequired,
    limit: PropTypes.number.isRequired,
  }).isRequired,
  totalItems: PropTypes.number.isRequired,
  onChangePage: PropTypes.func.isRequired,
};

export default Paginator;
