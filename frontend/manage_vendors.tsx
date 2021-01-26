import 'react-hot-loader';
import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from '@apollo/client';

import './index.css';
import VendorTable from './components/manageVendors';
import { PRODUCTS } from './components/manageVendors';
import apolloClient from './gql/client'; 

ReactDOM.render(
  <React.StrictMode>
    <ApolloProvider client={apolloClient}>
      <VendorTable vendors={PRODUCTS} />
    </ApolloProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
