// import Image from 'next/image';
import React from 'react';

import Link from 'next/link';

import styles from './header.module.css';

function Header() {
  return (
    <Link href="/" passHref className={styles.link}>
      <div className={styles.header}>
        <div className={styles.text}>Inventory System</div>
      </div>
    </Link>
  );
}

export default Header;
