import Image from 'next/image';
import React from 'react';

import styles from './footer.module.css';

function Footer() {
  return (
    <footer className={styles.footer}>
      <a
        href="https://www.linkedin.com/in/agsant01"
        target="_blank"
        rel="noopener noreferrer"
      >
        <span style={{ marginRight: '6px' }}>
          Powered by Gabriel Santiago&apos;s Coffee
        </span>
        <Image src="/LI-In-Bug.png" width={25} height={20} />
      </a>
    </footer>
  );
}

export default Footer;
