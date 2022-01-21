import React, { useState } from 'react';
import ItemList from '../components/item-list';
import ItemAdd from '../components/item-add';

import styles from '../styles/Home.module.css';

import getItems from './api/items';

// This gets called on every request
export async function getServerSideProps() {
  const items = await getItems();
  return { props: { items } };
}

// eslint-disable-next-line react/prop-types
function Home({ items }) {
  // eslint-disable-next-line no-console
  console.log('Home...', items);

  const [itemToAdd, setItemToAdd] = useState(null);
  const [itemList, setItemList] = useState(items);

  const onSubmit = (event) => {
    console.log(event);
    setItemList([...itemList, { id: itemList.length + 1, ...itemToAdd }]);
  };

  const onChange = (event) => {
    setItemToAdd(event);
  };

  // eslint-disable-next-line no-console
  const onEdit = (a) => console.log(a);

  const deleteItem = (item) => {
    console.log(`Item deleted: ${JSON.stringify(item)}`);
    setItemList(itemList.filter((value) => value !== item));
  };

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <div>
          <h2>Add Item</h2>
          <ItemAdd
            item={setItemToAdd}
            onSubmit={onSubmit}
            onChange={onChange}
          />
        </div>
        <div className={styles.itemList}>
          <h2>Item List</h2>
          <ItemList
            onEdit={onEdit}
            items={itemList}
            onDelete={(item) => deleteItem(item)}
          />
        </div>
      </div>
    </main>
  );
}

export default Home;
