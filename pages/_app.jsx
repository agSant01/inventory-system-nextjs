import React from 'react';

import PropTypes from 'prop-types';

import '../styles/globals.css';

import Layout from '../components/layout';

function MyApp({ Component, pageProps }) {
  console.log('MyApp start...');
  return (
    <div id="#root">
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </div>
  );
}

MyApp.propTypes = {
  Component: PropTypes.func.isRequired,
  // eslint-disable-next-line react/forbid-prop-types
  pageProps: PropTypes.object.isRequired,
};

export default MyApp;
