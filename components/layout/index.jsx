import Head from 'next/head';

import React from 'react';

import styles from './layout.module.css';
import Footer from '../footer';
import Header from '../header';

// eslint-disable-next-line react/prop-types
function Layout({ children }) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Inventory System App</title>
        <meta name="description" content="Created by Gabriel Santiago" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <Header />
      <main className={styles.main}>{children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
