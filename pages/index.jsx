import React, { useState } from 'react';
import ItemList from '../components/item-list';
import ItemAdd from '../components/item-add';

import styles from '../styles/Home.module.css';

function Home() {
  // eslint-disable-next-line no-console
  console.log('Home...');

  // State to allow the ItemAdd component trigger a state
  // change so we can fetch and render again ItemList with the updated list.
  const [reload, setReload] = useState(false);

  const handleSubmit = (item) => {
    // eslint-disable-next-line no-console
    console.log(`Event: ${JSON.stringify(item)}`);
    setReload(!reload); // change state to trigger child ItemList render
  };

  return (
    <main className={styles.main}>
      <div className={styles.box}>
        <div>
          <h2>Add Item</h2>
          <ItemAdd onSubmit={handleSubmit} />
        </div>
        <div className={styles.itemList}>
          <h2>Item List</h2>
          <ItemList reload={reload} />
        </div>
      </div>
    </main>
  );
}

export default Home;
