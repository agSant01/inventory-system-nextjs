import React, { useState } from 'react';
import ItemList from '../components/item-list';
import ItemAdd from '../components/item-add';

import styles from '../styles/Home.module.css';

function Home() {
  // eslint-disable-next-line no-console
  console.log('Home...');

  const [reload, setReload] = useState(false);

  const handleSubmit = (item) => {
    // eslint-disable-next-line no-console
    console.log(`Event: ${JSON.stringify(item)}`);
    setReload(!reload);
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
